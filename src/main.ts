import { app, BrowserWindow } from 'electron'
const path = require('path');

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  win.loadFile('./index.html')

  win.webContents.openDevTools()
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