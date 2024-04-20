import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Onboarding from "./components/Onboarding/Onboarding"; // Import the Onboarding component
import LoginPage from "./Screens/LoginPage/LoginPage";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Profile from "./Screens/Profile/Profile";
import Settings from "./Screens/Settings/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignupScreen from "./Screens/SignupScreen/SignupScreen";
import FingerPrint from "./components/Onboarding/FingerPrint";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingWithComplete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FingerPrint"
        component={FingerPrint}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const OnboardingWithComplete = ({ navigation }) => {
  const handleComplete = () => {
    navigation.navigate("Login");
  };

  return <Onboarding onComplete={handleComplete} />;
};

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack}   options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={Profile}   options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings}  options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
       
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoShapes1: {
    width: 130,
    height: 110,
    position: "absolute",
    zIndex: 1,
    bottom: "44%",
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
