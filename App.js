import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Onboarding from './components/Onboarding/Onboarding'; // Import the Onboarding component
import LoginPage from './Screens/LoginPage/LoginPage';

const App = () => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  
  return (
    <View style={{ flex: 1 }}>
      {!completed ? <Onboarding onComplete={handleComplete} /> : <LoginPage />}
    </View>
  );
};



export default App;
