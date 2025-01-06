// EmailScreen.jsx
import React, { useState } from 'react';

function EmailScreen({ onSubmitEmail }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(value);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    onSubmitEmail(email);
  };

  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#084B8A',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Enter Your Email
      </h2>

      <input 
        type="text"
        value={email}
        onChange={handleChange}
        placeholder="example@domain.com"
        style={{
          padding: '10px',
          fontSize: '1.2rem',
          width: '300px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '10px'
        }}
      />
      {error && (
        <p style={{ color: 'red', margin: '0 0 10px' }}>{error}</p>
      )}

      <button 
        style={{
          fontSize: '1.2rem',
          padding: '10px 20px',
          backgroundColor: '#FFD700',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default EmailScreen;
