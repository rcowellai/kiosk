// ReviewScreen.jsx
import React from 'react';

function ReviewScreen({ compiledPath, onRetake, onConfirm }) {
  // If compiledPath is null or invalid, we might show a placeholder.
  // Otherwise, we show the final composited image from GSW.

  // Construct a file:// URL. Also handle backslashes vs. forward slashes.
  let bgStyle = {};
  if (compiledPath) {
    const safePath = compiledPath.replace(/\\/g, '/');
    bgStyle = {
      width: 600,
      height: 400,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url("file:///${safePath}")`,
      border: '4px solid #fff',
      borderRadius: '8px',
      marginBottom: '20px'
    };
  } else {
    bgStyle = {
      width: 600,
      height: 400,
      backgroundColor: '#444',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      border: '4px solid #fff',
      borderRadius: '8px'
    };
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
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Review Your Photo
      </h2>

      <div style={bgStyle}>
        {!compiledPath && <p>No image found.</p>}
      </div>

      <div>
        <button 
          style={{
            marginRight: 40,
            fontSize: '1.2rem',
            padding: '10px 20px',
            backgroundColor: '#FFD700',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={onRetake}
        >
          Retake
        </button>

        <button 
          style={{
            marginLeft: 40,
            fontSize: '1.2rem',
            padding: '10px 20px',
            backgroundColor: '#32CD32',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ReviewScreen;
