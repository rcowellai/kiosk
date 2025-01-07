// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  capturePhoto: async () => {
    const result = await ipcRenderer.invoke('capture-photo');
    return result;
  },

  setActiveBackground: async (bgPath) => {
    const result = await ipcRenderer.invoke('set-active-background', bgPath);
    return result;
  },

  sendEmail: async (email) => {
    console.log('[preload] sendEmail() with:', email);
    const result = await ipcRenderer.invoke('send-email', email);
    return result;
  }
});
