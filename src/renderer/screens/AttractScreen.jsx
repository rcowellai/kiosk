// AttractScreen.jsx
import React from 'react';

function AttractScreen({ onNext }) {
  const handleTouch = () => {
    onNext();
  };

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B3D91', // Deep navy
        color: '#FFFFFF',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '0 20px'
      }}
      onClick={handleTouch}
    >
      <h1 style={{ fontSize: '4rem', margin: '0 0 20px' }}>Welcome</h1>
      <p style={{ fontSize: '1.5rem' }}>
        Touch the screen anywhere to get started
      </p>
    </div>
  );
}

export default AttractScreen;
