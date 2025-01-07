// App.jsx
import React, { useState } from 'react';
// Screens we assume exist:
import AttractScreen from './screens/AttractScreen';
import BackgroundSelectionScreen from './screens/BackgroundSelectionScreen';
import CountdownScreen from './screens/CountdownScreen';
import ReviewScreen from './screens/ReviewScreen';
import EmailScreen from './screens/EmailScreen';
import ThankYouScreen from './screens/ThankYouScreen';

function App() {
  const [screen, setScreen] = useState('attract');

  // We'll store the path to the newly compiled .png here.
  // The Countdown screen will set it once the file is detected, then pass it to ReviewScreen.
  const [compiledPath, setCompiledPath] = useState(null);

  //---------------------------------------
  // Navigation / Flow
  //---------------------------------------
  const goToBackgroundSelection = () => {
    setScreen('backgroundSelection');
  };

  // Suppose when you confirm from Email, you go to 'thankYou'
  const goToThankYou = () => {
    setScreen('thankYou');
  };

  //---------------------------------------
  // Example flow 
  // (Attract -> BGSelection -> Countdown -> Review -> Email -> ThankYou)
  //---------------------------------------

  return (
    <>
      {screen === 'attract' && (
        <AttractScreen onNext={goToBackgroundSelection} />
      )}

      {screen === 'backgroundSelection' && (
        <BackgroundSelectionScreen
          // ... you'd pass background selection props, etc.
          onNext={() => setScreen('countdown')}
        />
      )}

      {screen === 'countdown' && (
        <CountdownScreen
          // When the compiled .png is ready, we store it and move to Review
          onCompiledReady={(filePath) => {
            setCompiledPath(filePath);
            setScreen('review');
          }}
          // If user wants an alternative approach, could pass a retake limit, etc.
        />
      )}

      {screen === 'review' && (
        <ReviewScreen
          compiledPath={compiledPath}
          // Retake -> back to countdown
          onRetake={() => setScreen('countdown')}
          // Confirm -> go to email
          onConfirm={() => setScreen('email')}
        />
      )}

      {screen === 'email' && (
        <EmailScreen
          onEmailSubmitted={() => goToThankYou()}
        />
      )}

      {screen === 'thankYou' && (
        <ThankYouScreen
          // Suppose ThankYou screen auto-returns to 'attract' after 20s, 
          // or gives user a "Done" button. Just an example.
          onReturnToAttract={() => setScreen('attract')}
        />
      )}
    </>
  );
}

export default App;
