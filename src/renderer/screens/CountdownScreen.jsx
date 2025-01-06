import React, { useState, useEffect } from 'react';

function CountdownScreen({ onCountdownComplete }) {
  const [count, setCount] = useState(3);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  // 1) Decrement countdown every second until it hits 0 (or below).
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  // 2) When count hits 3, trigger camera capture.
  useEffect(() => {
    if (count === 3 && !photoCaptured) {
      console.log('[Countdown] count=3 → triggerPhotoCapture immediately');
      triggerPhotoCapture();
    }
  }, [count, photoCaptured]);

  // 3) Separate effect to check if both (count <= 0) & (photoCaptured === true).
  //    Only then move on to ReviewScreen (or the next screen).
  useEffect(() => {
    if (count <= 0 && photoCaptured) {
      console.log('[Countdown] count <= 0 AND photoCaptured=true → onCountdownComplete()');
      onCountdownComplete();
    }
  }, [count, photoCaptured, onCountdownComplete]);

  const triggerPhotoCapture = async () => {
    console.log('[Countdown] triggerPhotoCapture() invoked at count=3');
    try {
      // Assuming preload script usage
      const result = await window.electronAPI.capturePhoto();
      console.log('[Countdown] capturePhoto result:', result);

      if (!result.success) {
        console.error('[Countdown] Capture failed:', result.error);
      } else {
        console.log('[Countdown] Photo capture command successful');
        setPhotoCaptured(true);
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
