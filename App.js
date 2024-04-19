import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Onboarding from "./components/Onboarding/Onboarding"; // Import the Onboarding component
import LoginPage from "./Screens/LoginPage/LoginPage";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

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
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {showSplash ? (
          <View style={styles.splashContainer}>
            <ImageBackground
              source={require("./assets/splash/LogoShapes1.png")}
              style={styles.logoShapes1}
            />
          </View>
        ) : !completed ? (
          <Onboarding onComplete={handleComplete} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ headerShown: false }} // LoginPage için başlığın görünmemesini sağlar
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }} // HomeScreen için başlığın görünmemesini sağlar
            />
          </Stack.Navigator>
        )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //et your desired background color for the splash screen
  },

  logoShapes1: {
    width: 130, // LogoShapes1'ın genişliğini ayarlayın
    height: 110, // LogoShapes1'ın yüksekliğini ayarlayın
    position: "absolute",
    zIndex: 1,
    bottom: "50%", // LogoShapes1'ı ekrandaki yüksekliğin yarısı kadar aşağıya konumlandırır
    // Ensure LogoShapes1 is above LogoShapes2
  },
});

export default App;
