// electron-main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

let mainWindow;
let watcher = null;             // We'll store the single watcher instance
let lastCaptureTime = null;     // Tracks time of the latest capture

// -------------------------------------------
// Folder Paths
// -------------------------------------------
const baseBgPath = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\Kiosk\\public\\backgrounds";
const capturedFolder = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\Captured";
const activeBackgroundFolder = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\ActiveBackground";
const compiledFolder = "C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\Compiled";

// -------------------------------------------
// 1) Capture Photo into 'Captured' folder
// -------------------------------------------
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

// -------------------------------------------
// 2) Copy chosen background to 'active_bg.jpg'
// -------------------------------------------
function setActiveBackground(relPath) {
  return new Promise((resolve) => {
    const filename = path.basename(relPath);
    const absoluteSource = path.join(baseBgPath, filename);
    const destFile = path.join(activeBackgroundFolder, 'active_bg.jpg');

    fs.copyFile(absoluteSource, destFile, (err) => {
      if (err) {
        console.error('[setActiveBackground] Error copying background:', err);
        return resolve({ success: false, error: err.message });
      }
      console.log('[setActiveBackground] Copied to', destFile);
      return resolve({ success: true });
    });
  });
}

// -------------------------------------------
// 3) Begin watching compiled folder, ignoring old .png
//    if its mtime is before captureTime. 
// -------------------------------------------
function beginWatchingCompiled(captureTime) {
  // If an old watcher is active, close it safely
  if (watcher) {
    try {
      watcher.close();
    } catch (err) {
      console.warn('[WATCHER] Attempted to close an already-null watcher:', err);
    }
    watcher = null;
  }

  lastCaptureTime = captureTime; // store globally for the watch callback

  watcher = fs.watch(compiledFolder, { recursive: false }, (eventType, filename) => {
    console.log('[WATCH DEBUG] eventType:', eventType, 'filename:', filename);

    if (
      filename &&
      filename.toLowerCase().endsWith('.png') &&
      (eventType === 'rename' || eventType === 'change')
    ) {
      const fullPngPath = path.join(compiledFolder, filename);

      // Check modTime
      fs.stat(fullPngPath, (err, stats) => {
        if (err) {
          console.warn('[WATCH] stat error for', fullPngPath, err);
          return;
        }
        console.log('[WATCH] Found PNG with mtime:', stats.mtime);

        // Compare mtime to the captureTime
        if (stats.mtime > lastCaptureTime) {
          console.log('[WATCHER] Detected new PNG =>', filename);
          if (mainWindow) {
            mainWindow.webContents.send('compiled-ready', filename);
          }

          // Safely close the watcher once the correct image is found
          if (watcher) {
            try {
              watcher.close();
            } catch (closeErr) {
              console.warn('[WATCHER] Error while closing watcher:', closeErr);
            }
            watcher = null;
          }
        } else {
          console.log('[WATCHER] PNG modTime <= captureTime. Ignoring older file:', filename);
        }
      });
    }
  });
}

// ----------------------------------------------------------------------
// IPC HANDLERS
// ----------------------------------------------------------------------
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

// Start watchers with a given captureTime (string or numeric)
ipcMain.handle('start-watching-compiled', (event, captureTimestamp) => {
  console.log('[IPC] start-watching-compiled invoked. captureTimestamp=', captureTimestamp);
  
  // Convert captureTimestamp to a Date if it's a string
  const capTime = new Date(captureTimestamp);
  beginWatchingCompiled(capTime);

  return { success: true };
});

// -------------------------------------------
// Electron Boot
// -------------------------------------------
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

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
