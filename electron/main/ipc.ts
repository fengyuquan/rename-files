import {
  app,
  dialog,
  ipcMain,
  nativeTheme,
  shell,
  IpcMainInvokeEvent,
  BrowserWindow,
} from 'electron'
import { indexHtml, url } from './constant'

export const handleIPC = () => {
  // 切换Dark\Light模式
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  // 打开选择文件窗口
  ipcMain.handle('select-folder', async (e: IpcMainInvokeEvent, mode) => {
    const openMode =
      mode === 0 ? ['multiSelections', 'openFile'] : ['openDirectory']

    return await dialog.showOpenDialog({
      title: mode === 0 ? '选择文件(多选)' : '选择文件夹',
      buttonLabel: '确定',
      defaultPath: app.getPath('documents'),
      // @ts-ignore
      properties: openMode,
    })
  })

  // 打开已修改文件所在目录
  ipcMain.handle('open-dir', (e: IpcMainInvokeEvent, dir: string) => {
    if (dir) {
      shell.openPath(dir)
    }
  })
}
