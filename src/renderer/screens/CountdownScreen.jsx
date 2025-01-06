// CountdownScreen.jsx
import React, { useState, useEffect } from 'react';

function CountdownScreen({ onCountdownComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      onCountdownComplete();
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, onCountdownComplete]);

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
