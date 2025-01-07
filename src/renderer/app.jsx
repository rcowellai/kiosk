// App.jsx
import React, { useState } from 'react';
import AttractScreen from './screens/AttractScreen';
import BackgroundSelectionScreen from './screens/BackgroundSelectionScreen';
import CountdownScreen from './screens/CountdownScreen';
import ReviewScreen from './screens/ReviewScreen';
import EmailScreen from './screens/EmailScreen';  // NEW import
import ThankYouScreen from './screens/ThankYouScreen';

function App() {
  const [screen, setScreen] = useState('attract');
  const [selectedBackground, setSelectedBackground] = useState(null);

  // Called from Attract
  const goToBackgroundSelection = () => setScreen('backgroundSelection');

  // Called from BackgroundSelection
  const handleBackgroundSelected = (bg) => {
    setSelectedBackground(bg);
  };
  const goToCountdown = () => setScreen('countdown');

  // Called from Countdown
  const handleCountdownFinish = () => setScreen('review');

  // Called from Review
  const handleRetake = () => setScreen('countdown');
  const handleConfirm = () => setScreen('email'); // Now go to Email, not ThankYou

  // Called from EmailScreen
  const handleEmailSubmitted = () => {
    setScreen('thankYou');
  };

  // ThankYou auto-returns to attract after 20s (we handle that in ThankYouScreen)
  // but if you needed to handle that state here, you could do so.

  return (
    <>
      {screen === 'attract' && (
        <AttractScreen onNext={goToBackgroundSelection} />
      )}
      {screen === 'backgroundSelection' && (
        <BackgroundSelectionScreen 
          onBackgroundSelected={handleBackgroundSelected}
          onNext={goToCountdown} 
        />
      )}
      {screen === 'countdown' && (
        <CountdownScreen onCountdownFinish={handleCountdownFinish} />
      )}
      {screen === 'review' && (
        <ReviewScreen 
          selectedBackground={selectedBackground}
          onRetake={handleRetake}
          onConfirm={handleConfirm}
        />
      )}
      {screen === 'email' && (
        <EmailScreen 
          onEmailSubmitted={handleEmailSubmitted} 
        />
      )}
      {screen === 'thankYou' && (
        <ThankYouScreen 
          onReturnToAttract={() => setScreen('attract')}
        />
      )}
    </>
  );
}

export default App;
