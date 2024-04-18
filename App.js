import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Onboarding from './components/Onboarding/Onboarding'; // Import the Onboarding component
import LoginPage from './Screens/LoginPage/LoginPage';

const App = () => {
  const [completed, setCompleted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a splash screen delay
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clear the timer when the component unmounts or when completed
    return () => clearTimeout(splashTimer);
  }, []);

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <View style={styles.splashContainer}>
          <ImageBackground source={require('./assets/splash/LogoShapes2.png')} style={styles.splashImage}>
            <ImageBackground source={require('./assets/splash/LogoShapes1.png')} style={styles.logoShapes1} />
          </ImageBackground>
        </View>
      ) : !completed ? (
        <Onboarding onComplete={handleComplete} />
      ) : (
        <LoginPage />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Set your desired background color for the splash screen
  },
  splashImage: {
    width: '80%', // Adjust the width as needed
    height: '50%', // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resize mode as needed
    marginBottom: 20, // Add margin between images if needed
  },
  logoShapes1: {
    width: '30%', // Adjust the width of LogoShapes1 inside LogoShapes2
    height: '30%', // Adjust the height of LogoShapes1 inside LogoShapes2
    position: 'absolute', // Position LogoShapes1 absolutely inside LogoShapes2
    top: '35%', // Adjust the top position of LogoShapes1 inside LogoShapes2
    left: '35%', // Adjust the left position of LogoShapes1 inside LogoShapes2
    zIndex: 1, // Ensure LogoShapes1 is above LogoShapes2
  },
});

export default App;
