export type ArchiveStatus = 'preparing' | 'extracting' | 'zipping' | 'complete'

export type ArchiveProgress = {
  status: ArchiveStatus
  message: string
  percent: number
}

declare global {
  interface Window {
    toolbox?: {
      selectArchive: () => Promise<string | null>
      getFilePath: (file: File) => string
      convertRarToZip: (inputPath: string, outputPath: string) => Promise<{ ok: true } | { ok: false; error: string }>
      saveFile: (defaultName: string) => Promise<string | null>
    }
  }
}

export {}
