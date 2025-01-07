// CountdownScreen.jsx
import React, { useState, useEffect } from 'react';

function CountdownScreen({ onCompiledReady }) {
  const [count, setCount] = useState(3);
  const [hasTriggeredCapture, setHasTriggeredCapture] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // Decrement the count
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    // If we wanted to do something at 0, we could
  }, [count]);

  // Trigger capture at count=3, if not yet triggered
  useEffect(() => {
    if (count === 3 && !hasTriggeredCapture) {
      setHasTriggeredCapture(true);
      handleCapture();
    }
  }, [count, hasTriggeredCapture]);

  // We define handleCapturePhoto to do the watchers approach with a fresh captureTime
  async function handleCapture() {
    console.log('[Countdown] handleCapture start');
    // 1) Mark a fresh capture time
    const captureTime = new Date();

    // 2) Trigger photo
    const result = await window.electronAPI.capturePhoto();
    if (!result.success) {
      console.error('[Countdown] capturePhoto failed:', result.error);
      return;
    }
    console.log('[Countdown] Photo captured. Now watch compiled with captureTime=', captureTime);

    // 3) Start watchers, passing the captureTime
    const watchResult = await window.electronAPI.startWatchingCompiled(captureTime.toISOString());
    if (!watchResult.success) {
      console.error('[Countdown] startWatchingCompiled failed', watchResult);
      return;
    }

    // 4) If not already, set up a one-time listener for compiled-ready
    if (!listening) {
      setListening(true);
      window.electronAPI.onCompiledReady((filename) => {
        // The main process has verified modTime > captureTime
        // So we know it's truly the new image
        console.log('[Countdown] compiled-ready =>', filename);
        const fullPath = `C:\\Users\\dj_ro\\OneDrive\\Desktop\\New Biz Work\\KioskMedia\\Compiled\\${filename}`;
        onCompiledReady(fullPath);
      });
    }
  }

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0B3D91',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Please Pose!
      </h2>
      <p style={{ fontSize: '8rem', margin: 0 }}>
        {count}
      </p>
      <p>(Camera triggers at 3, then we watch for compiled .png after {new Date().toLocaleTimeString()})</p>
    </div>
  );
}

export default CountdownScreen;
