const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    kiosk: false, // Set true to enable kiosk mode (full screen)
    webPreferences: {
      nodeIntegration: false, // more secure
      contextIsolation: true
    }
  });

  // If you ran "npm run build", load the local dist/index.html
  // If in dev mode, you might load http://localhost:3000
  const startUrl = process.env.ELECTRON_START_URL || 
    `file://${path.join(__dirname, 'dist', 'index.html')}`;
  win.loadURL(startUrl);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
