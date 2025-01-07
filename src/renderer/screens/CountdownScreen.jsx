// CountdownScreen.jsx
import React, { useState, useEffect } from 'react';

function CountdownScreen({ onCountdownFinish }) {
  const [count, setCount] = useState(3);
  const [hasTriggeredCapture, setHasTriggeredCapture] = useState(false);

  // Decrement the countdown every second
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    // If count <= 0, move on to Review
    console.log('[Countdown] count <= 0, moving to review screen');
    onCountdownFinish();
  }, [count, onCountdownFinish]);

  // Trigger the camera at count=3 (once)
  useEffect(() => {
    if (count === 3 && !hasTriggeredCapture) {
      console.log('[Countdown] count=3 → triggerPhotoCapture');
      triggerPhotoCapture();
      setHasTriggeredCapture(true);
    }
  }, [count, hasTriggeredCapture]);

  const triggerPhotoCapture = async () => {
    console.log('[Countdown] triggerPhotoCapture() invoked');
    try {
      const result = await window.electronAPI.capturePhoto();
      console.log('[Countdown] capturePhoto result:', result);
      if (!result.success) {
        console.error('[Countdown] Capture failed:', result.error);
      } else {
        console.log('[Countdown] Photo capture command issued successfully.');
      }
    } catch (err) {
      console.error('[Countdown] Error calling capture-photo:', err);
    }
  };

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
      <p style={{ fontSize: '8rem', margin: '0' }}>
        {count}
      </p>
    </div>
  );
}

export default CountdownScreen;
