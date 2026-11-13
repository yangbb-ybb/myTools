import { contextBridge, ipcRenderer, webUtils } from 'electron'

contextBridge.exposeInMainWorld('toolbox', {
  selectArchive: () => ipcRenderer.invoke('archive:select'),
  getFilePath: (file: File) => webUtils.getPathForFile(file),
  saveFile: (defaultName: string) => ipcRenderer.invoke('file:save', defaultName),
  convertRarToZip: (inputPath: string, outputPath: string) => ipcRenderer.invoke('archive:convert', inputPath, outputPath),
})
