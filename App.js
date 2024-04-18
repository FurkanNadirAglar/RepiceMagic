import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Onboarding from './components/Onboarding/Onboarding'; // Import the Onboarding component
import LoginPage from './Screens/LoginPage/LoginPage';

const App = () => {
  const [completed, setCompleted] = useState(false);

  // Define a function to handle completion of onboarding
  const handleComplete = () => {
    setCompleted(true);
    // Perform any necessary actions upon completion of onboarding
  };

  // Conditionally render Onboarding component if not completed, else render the main content
  return (
    <View style={{ flex: 1 }}>
      {!completed ? <Onboarding onComplete={handleComplete} /> : <LoginPage />}
    </View>
  );
};

// Define your main content component here


export default App;
