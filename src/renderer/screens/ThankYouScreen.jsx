// ThankYouScreen.jsx
import React, { useEffect } from 'react';

function ThankYouScreen({ onReturnToAttract }) {
  useEffect(() => {
    // 1) After 20s, go to attract
    const timer = setTimeout(() => {
      onReturnToAttract();
    }, 20000);

    return () => clearTimeout(timer);
  }, [onReturnToAttract]);

  // 2) If user clicks anywhere, also return to attract
  const handleClick = () => {
    onReturnToAttract();
  };

  return (
    <div
      onClick={handleClick}
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
        Returning to main screen in 20 seconds or tap anywhere to return now.
      </p>
    </div>
  );
}

export default ThankYouScreen;
