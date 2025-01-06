// electron-main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // <-- specify preload script
    },
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'));
}


// This function spawns the digiCamControl CLI to capture a photo
function captureWithDigiCamControl() {
  return new Promise((resolve) => {
    // Adjust the path here
    const command = "\"C:\\Program Files (x86)\\digiCamControl\\CameraControlCmd.exe\" /capture";

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error capturing photo:', error);
        return resolve({ success: false, error: error.message });
      }
      console.log('digiCamControl output (stdout):', stdout);
      console.log('digiCamControl errors (stderr):', stderr);
      resolve({ success: true });
    });
  });
}

// IPC handler: front end calls "capture-photo", we run captureWithDigiCamControl
ipcMain.handle('capture-photo', async () => {
  console.log('[IPC] capture-photo invoked.');
  const result = await captureWithDigiCamControl();
  if (!result.success) {
    console.error('[IPC] capture-photo failed:', result.error);
  } else {
    console.log('[IPC] capture-photo success!');
  }
  return result;
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

