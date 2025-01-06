// App.jsx
import React, { useState } from 'react';
import AttractScreen from './screens/AttractScreen';
import BackgroundSelectionScreen from './screens/BackgroundSelectionScreen';
import CountdownScreen from './screens/CountdownScreen';
import ReviewScreen from './screens/ReviewScreen';
import EmailScreen from './screens/EmailScreen';
import ThankYouScreen from './screens/ThankYouScreen';

function App() {
  const [screen, setScreen] = useState('attract');
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [retakeCount, setRetakeCount] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  // Called when user picks a background in BackgroundSelectionScreen
  const handleBackgroundSelected = (bg) => {
    setSelectedBackground(bg);
    setRetakeCount(0); // Reset retakes each new session or background pick
    setScreen('countdown');
  };

  // Called when the countdown finishes -> move to review
  const handleCountdownComplete = () => {
    setScreen('review');
  };

  // Called when user confirms (or retakes) from ReviewScreen
  const handleRetake = () => {
    if (retakeCount < 3) {
      setRetakeCount(retakeCount + 1);
      setScreen('countdown');
    }
  };

  // Called when user moves from Review to Email
  const handleConfirmReview = () => {
    setScreen('email');
  };

  // Called when user submits email
  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setScreen('thankYou');
  };

  // Called when ThankYouScreen times out
  const handleThankYouTimeout = () => {
    setScreen('attract');
    // Potentially clear session data if you want a fresh start
    setSelectedBackground(null);
    setRetakeCount(0);
    setUserEmail('');
  };

  return (
    <>
      {screen === 'attract' && (
        <AttractScreen onNext={() => setScreen('backgroundSelection')} />
      )}
      {screen === 'backgroundSelection' && (
        <BackgroundSelectionScreen onBackgroundSelect={handleBackgroundSelected} />
      )}
      {screen === 'countdown' && (
        <CountdownScreen onCountdownComplete={handleCountdownComplete} />
      )}
      {screen === 'review' && (
        <ReviewScreen
          selectedBackground={selectedBackground}
          retakeCount={retakeCount}
          onRetake={handleRetake}
          onConfirm={handleConfirmReview}
        />
      )}
      {screen === 'email' && (
        <EmailScreen onSubmitEmail={handleEmailSubmit} />
      )}
      {screen === 'thankYou' && (
        <ThankYouScreen onTimeout={handleThankYouTimeout} />
      )}
    </>
  );
}

export default App;
