// ThankYouScreen.jsx
import React, { useEffect } from 'react';

function ThankYouScreen({ onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, 20000); // 20 seconds
    return () => clearTimeout(timer);
  }, [onTimeout]);

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
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}
    >
      {/* If you prefer an image, place it here */}
      <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Thank You!
      </h2>
      <p style={{ fontSize: '1.5rem' }}>
        Your session is complete.
      </p>
    </div>
  );
}

export default ThankYouScreen;
