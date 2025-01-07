// ProcessingScreen.jsx
import React, { useEffect, useState } from 'react';

function ProcessingScreen({ onCompiledReady }) {
  const [info, setInfo] = useState('Waiting for GSW to finish...');

  useEffect(() => {
    console.log('[ProcessingScreen] Mount → startWatchingCompiled');
    // Start watching for new PNG in the compiled folder
    window.electronAPI.startWatchingCompiled()
      .then(res => {
        if (!res.success) {
          setInfo('Error setting up watcher');
        } else {
          setInfo('Watcher started. Waiting for new .png...');
        }
      })
      .catch(err => setInfo('Error: ' + err.message));

    // Also set up the compiled-ready listener
    window.electronAPI.onCompiledReady((filename) => {
      console.log('[ProcessingScreen] compiled-ready event →', filename);
      setInfo(`New PNG detected: ${filename}. Moving to review...`);
      // After a small delay, call onCompiledReady
      setTimeout(() => {
        onCompiledReady(filename);
      }, 1000);
    });
  }, [onCompiledReady]);

  return (
    <div 
      style={{
        height: '100vh',
        backgroundColor: '#222',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial'
      }}
    >
      <h2>Processing...</h2>
      <p>{info}</p>
    </div>
  );
}

export default ProcessingScreen;
