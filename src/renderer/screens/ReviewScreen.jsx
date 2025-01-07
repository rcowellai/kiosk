// ReviewScreen.jsx
import React from 'react';

function ReviewScreen({ selectedBackground, onRetake, onConfirm }) {
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

      <div 
        style={{
          width: 600,
          height: 400,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // For now, we display only the chosen background as a placeholder
          // In future, you'd show the actual composited image from GSW
          backgroundImage: `url(${selectedBackground})`,
          border: '4px solid #fff',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      />

      <div style={{ marginTop: 20 }}>
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
