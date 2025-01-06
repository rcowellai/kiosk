// ReviewScreen.jsx
import React from 'react';

function ReviewScreen({ 
  selectedBackground, 
  retakeCount, 
  onRetake, 
  onConfirm 
}) {
  const maxRetakes = 3;
  const canRetake = retakeCount < maxRetakes;

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
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Review Your Photo
      </h2>

      <div 
        style={{
          width: 600,
          height: 400,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${selectedBackground})`,
          border: '4px solid #fff',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      />

      <p style={{ fontSize: '1.25rem' }}>
        If you’d like to retake, press RETAKE below.
        <br />
        (Max {maxRetakes} retakes, used {retakeCount})
      </p>

      <div>
        <button 
          style={{
            marginRight: 20,
            fontSize: '1.2rem',
            padding: '10px 20px',
            backgroundColor: canRetake ? '#FFD700' : '#999999',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: canRetake ? 'pointer' : 'default'
          }}
          onClick={canRetake ? onRetake : undefined}
          disabled={!canRetake}
        >
          Retake
        </button>

        <button 
          style={{
            marginLeft: 20,
            fontSize: '1.2rem',
            padding: '10px 20px',
            backgroundColor: '#32CD32', // LimeGreen
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
