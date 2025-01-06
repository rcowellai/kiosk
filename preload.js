// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  capturePhoto: async () => {
    console.log('[preload] capturePhoto() invoked');
    const result = await ipcRenderer.invoke('capture-photo');
    console.log('[preload] capturePhoto() result:', result);
    return result;
  }
});
