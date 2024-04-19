import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Bu kısmı düzenle, kullanılan icon setine göre
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const handleLogin = () => {
    // Burada, kullanıcı log in butonuna bastığında yönlendirme işlemi yapılır
    navigation.navigate("HomeScreen");
  };
  const handleFingerPrint = () => {
    navigation.navigate("FingerPrint");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 100,
          fontSize: 25,
          color: "#F8F8F8",
          fontWeight: "bold",
        }}
      >
        Log In
      </Text>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity
              onPress={toggleSecureEntry}
              style={styles.toggleIcon}
            >
              <Feather
                name={secureTextEntry ? "eye" : "eye-off"}
                size={24}
                color="#E95322"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => console.log("Google icon pressed")}>
            <Image
              source={require("../../assets/login/GoogleIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFingerPrint}
          >
            <Image
              source={require("../../assets/login/FingerprintIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F5CB58",
  },
  loginContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F3E9B5",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#F3E9B5",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#E95322",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#E95322",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  orText: {
    textAlign: "center",
    marginTop: 40,
    color: "black",
    marginVertical: 5,
  },
  icons: {
    flexDirection: "row", // İkonları yatay olarak hizalamak için
    alignItems: "center", // İkonları dikey olarak hizalamak için
    alignSelf: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5, // İkonlar arasındaki boşluğu ayarlamak için
  },
  signUpText: {
    marginTop: 10, // Google iconundan metne bir boşluk oluşturmak için
    color: "#E95322",
    fontWeight: "bold",
    alignSelf:"center"
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
});

export default LoginPage;
