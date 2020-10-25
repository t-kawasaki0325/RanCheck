import { app, BrowserWindow } from 'electron'
const path = require('path')
require('dotenv').config()

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
  win.loadFile(loadPath + '/index.html')

  process.env.NODE_ENV === 'development' && win.webContents.openDevTools()
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
