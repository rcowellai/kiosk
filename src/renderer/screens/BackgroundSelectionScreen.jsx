// BackgroundSelectionScreen.jsx
import React, { useState } from 'react';

const backgrounds = [
  './backgrounds/background1.jpg',
  './backgrounds/background2.jpg',
  './backgrounds/background3.jpg'
];

function BackgroundSelectionScreen({ onBackgroundSelected, onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? backgrounds.length - 1 : prev - 1
    );
  };

  const handleSelect = async () => {
    const selectedBg = backgrounds[currentIndex];
    console.log('[BackgroundSelectionScreen] setActiveBackground =>', selectedBg);
    const result = await window.electronAPI.setActiveBackground(selectedBg);
    if (!result.success) {
      console.error('[BackgroundSelectionScreen] Failed to set background:', result.error);
      return;
    }
    onBackgroundSelected(selectedBg);
    onNext();
  };

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#084B8A',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Select Your Background
      </h2>
      <div 
        style={{
          width: 600,
          height: 400,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${backgrounds[currentIndex]})`,
          border: '4px solid #fff',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      />
      <div style={{ marginBottom: '20px' }}>
        <button 
          style={{
            marginRight: 40,
            fontSize: '2rem',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
          onClick={handlePrev}
        >
          ←
        </button>
        <button 
          style={{
            fontSize: '2rem',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
          onClick={handleNext}
        >
          →
        </button>
      </div>
      <button
        style={{
          fontSize: '1.5rem',
          padding: '15px 30px',
          cursor: 'pointer',
          backgroundColor: '#FFD700',
          color: '#000',
          border: 'none',
          borderRadius: '4px'
        }}
        onClick={handleSelect}
      >
        Select This Background
      </button>
    </div>
  );
}

export default BackgroundSelectionScreen;
