import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Onboarding from "./components/Onboarding/Onboarding"; // Import the Onboarding component
import LoginPage from "./Screens/LoginPage/LoginPage";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./Screens/SignupScreen/SignupScreen";
import FingerPrint from "./components/Onboarding/FingerPrint";

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
      {showSplash ? (
        <View style={styles.splashContainer}>
          <View style={styles.circle} />
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
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }} // HomeScreen için başlığın görünmemesini sağlar
          />
          <Stack.Screen
            name="FingerPrint"
            component={FingerPrint}
            options={{ headerShown: false }} // HomeScreen için başlığın görünmemesini sağlar
          />
        </Stack.Navigator>
      )}
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
    bottom: "44%", // LogoShapes1'ı ekrandaki yüksekliğin yarısı kadar aşağıya konumlandırır
    // Ensure LogoShapes1 is above LogoShapes2
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#E95322",
    position: "absolute",
    zIndex: 0,
  },
});

export default App;
