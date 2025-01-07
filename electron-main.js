// electron-main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let mainWindow;

// Adjust these folder paths as needed
const baseBgPath = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\Kiosk\\public\\backgrounds";
const capturedFolder = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\Captured";
const backgroundsFolder = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\Backgrounds";

// DigiCamControl capture function (unchanged)
function captureWithDigiCamControl() {
  return new Promise((resolve) => {
    const command = `"C:\\Program Files (x86)\\digiCamControl\\CameraControlCmd.exe" /capture /folder "${capturedFolder}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('[exec] Error capturing photo:', error);
        return resolve({ success: false, error: error.message });
      }
      console.log('[exec] digiCamControl stdout:', stdout);
      console.log('[exec] digiCamControl stderr:', stderr);
      resolve({ success: true });
    });
  });
}

// IPC: kiosk calls "capture-photo"
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

// Convert relative path (e.g. "./backgrounds/background3.jpg") to an absolute path
function setActiveBackground(relPath) {
  return new Promise((resolve) => {
    const filename = path.basename(relPath); 
    const absoluteSource = path.join(baseBgPath, filename);
    const destFile = path.join(backgroundsFolder, 'active_bg.jpg');

    fs.copyFile(absoluteSource, destFile, (err) => {
      if (err) {
        console.error('[setActiveBackground] Error copying background:', err);
        return resolve({ success: false, error: err.message });
      }
      console.log(`[setActiveBackground] Copied to ${destFile}`);
      return resolve({ success: true });
    });
  });
}

// IPC: kiosk calls "set-active-background"
ipcMain.handle('set-active-background', async (event, backgroundFilePath) => {
  console.log('[IPC] set-active-background invoked with:', backgroundFilePath);
  const result = await setActiveBackground(backgroundFilePath);
  if (!result.success) {
    console.error('[IPC] set-active-background failed:', result.error);
  } else {
    console.log('[IPC] set-active-background success!');
  }
  return result;
});

// Placeholder for sending email
ipcMain.handle('send-email', async (event, email) => {
  console.log(`[IPC] send-email invoked. Email: ${email}`);
  // Here you'd integrate with an email API or SMTP library.
  // For now, we pretend it's successful.
  return { success: true };
});

// Create the main window, load kiosk’s index.html
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
}

// Standard Electron setup
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
