// ThankYouScreen.jsx
import React, { useEffect } from 'react';

function ThankYouScreen({ onReturnToAttract }) {
  useEffect(() => {
    // 20 second timer
    const timer = setTimeout(() => {
      console.log('[ThankYouScreen] 20s inactivity, returning to attract');
      onReturnToAttract();
    }, 20000);

    return () => clearTimeout(timer);
  }, [onReturnToAttract]);

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Thank You!
      </h2>
      <p style={{ fontSize: '1.5rem' }}>
        Your session is complete.
      </p>
      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Returning to main screen in 20 seconds...
      </p>
    </div>
  );
}

export default ThankYouScreen;
