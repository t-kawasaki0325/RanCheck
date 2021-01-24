import { app, BrowserWindow, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

const path = require('path')
require('dotenv').config()

autoUpdater.logger = log
// @ts-ignore
autoUpdater.logger.transports.file.level = 'info'

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  const loadPath = process.env.NODE_ENV === 'development' ? '.' : './dist'
  win.loadFile(`${loadPath}/index.html`)

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', () => {
  autoUpdater.checkForUpdates()

  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        message:
          'RanCheckのアップデートがあります。アプリを終了してアップデートしますか？',
        buttons: ['再起動して更新', '後で'],
      })
      .then(result => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall()
        }
      })
  })
})
