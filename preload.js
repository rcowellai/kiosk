// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  capturePhoto: async () => {
    return await ipcRenderer.invoke('capture-photo');
  },

  setActiveBackground: async (bgPath) => {
    return await ipcRenderer.invoke('set-active-background', bgPath);
  },

  // Start watchers with a capture time string
  startWatchingCompiled: async (captureTimeString) => {
    // e.g. new Date() => pass .toISOString(), or just pass .getTime()
    const result = await ipcRenderer.invoke('start-watching-compiled', captureTimeString);
    return result;
  },

  // Provide a listener for the compiled-ready event
  onCompiledReady: (callback) => {
    ipcRenderer.on('compiled-ready', (event, filename) => {
      callback(filename);
    });
  }
});
