import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, basename, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtemp, rm, stat } from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import { spawn } from 'node:child_process'

const isDev = process.argv.includes('--dev')
// Some macOS environments (including restricted CI/sandboxed runners) cannot initialize
// Electron's GPU process. Falling back to software rendering keeps the window usable.
app.disableHardwareAcceleration()
let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 800,
    minHeight: 620,
    backgroundColor: '#f7f8fb',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      // preload.ts is emitted as an ES module; disable the renderer sandbox so
      // Electron can load the contextBridge preload reliably in packaged apps.
      sandbox: false,
    },
  })
  if (isDev) mainWindow.loadURL('http://127.0.0.1:5173')
  else mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  mainWindow.on('closed', () => { mainWindow = null })
}

function sidecarCandidates() {
  const arch = process.arch === 'arm64' ? 'arm64' : 'x64'
  const platform = process.platform === 'win32' ? 'win' : 'mac'
  const filename = process.platform === 'win32' ? '7zz.exe' : '7zz'
  return [
    join(process.resourcesPath, '7zip', `${platform}-${arch}`, filename),
    join(process.cwd(), 'vendor', '7zip', `${platform}-${arch}`, filename),
  ]
}

function runCommand(command: string, args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
    child.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })
    child.on('error', reject)
    child.on('close', (code) => resolve({ code: code ?? -1, stdout, stderr }))
  })
}

function friendlyArchiveError(stderr: string) {
  const text = stderr.toLowerCase()
  if (text.includes('password') || text.includes('encrypted')) return '此 RAR 需要密码，首版暂不支持加密压缩包。'
  if (text.includes('volumes') || text.includes('multipart')) return '首版暂不支持分卷 RAR，请选择完整的单文件压缩包。'
  if (text.includes('cannot open') || text.includes('not found')) return '无法打开该 RAR 文件，请确认文件完整且有访问权限。'
  if (text.includes('not implemented') || text.includes('unsupported method') || text.includes('can not open the file as archive')) return '当前内置解包组件不支持该 RAR 格式，可能是新版 RAR5，请更新 7-Zip 组件后重试。'
  return 'RAR 转换失败：当前内置解包组件版本不支持该 RAR 格式（可能是 RAR5），请使用新版 7-Zip 组件后重试。'
}

ipcMain.handle('archive:select', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'RAR archive', extensions: ['rar'] }] })
  return result.canceled ? null : result.filePaths[0] ?? null
})

ipcMain.handle('file:save', async (_event, defaultName: unknown) => {
  const name = typeof defaultName === 'string' && defaultName.toLowerCase().endsWith('.zip') ? basename(defaultName) : 'converted.zip'
  const result = await dialog.showSaveDialog({ defaultPath: name, filters: [{ name: 'ZIP archive', extensions: ['zip'] }] })
  return result.canceled ? null : result.filePath ?? null
})

ipcMain.handle('archive:convert', async (_event, inputPath: unknown, outputPath: unknown) => {
  if (typeof inputPath !== 'string' || typeof outputPath !== 'string' || extname(inputPath).toLowerCase() !== '.rar') return { ok: false, error: '请选择有效的 .rar 文件。' }
  const sidecar = sidecarCandidates().find(existsSync)
  if (!sidecar) return { ok: false, error: '当前安装包缺少 7-Zip 解包组件，请重新安装完整版本后重试。' }
  try {
    const info = await stat(inputPath)
    if (info.size > 1024 * 1024 * 1024) return { ok: false, error: '单个 RAR 文件不能超过 1 GB。' }
    const workingDir = await mkdtemp(join(tmpdir(), 'toolbox-rar-'))
    const extractionDir = join(workingDir, 'extracted')
    try {
      const extract = await runCommand(sidecar, ['x', inputPath, `-o${extractionDir}`, '-y', '-spf-'])
      if (extract.code !== 0) return { ok: false, error: friendlyArchiveError(extract.stderr || extract.stdout) }
      const zip = await runCommand(sidecar, ['a', '-tzip', outputPath, extractionDir, '-r', '-y'])
      if (zip.code !== 0) return { ok: false, error: friendlyArchiveError(zip.stderr || zip.stdout) }
      return { ok: true as const }
    } finally {
      await rm(workingDir, { recursive: true, force: true })
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : '文件转换失败。' }
  }
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
