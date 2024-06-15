import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const API_KEY = "AIzaSyCOi3C0XgCRXBVOsq3J8DuVtYCJsFFbyvw";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "hello! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text().replace(/\*\*/g, ''); // Clean the text
      console.log(text);
      showMessage({
        message: "Ask Me for Magic Recipes 🤖",
        description: text,
        type: "info",
        icon: "info",
        duration: 4000, // Increased duration for better visibility
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    // Function call
    startChat();

    return () => {
      // Cleanup function to stop speech on unmount
      Speech.stop();
      setIsSpeaking(false);
    };
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages([...messages, userMessage]); // Add user message to the end

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().replace(/\*\*/g, ''); // Clean the text
    setMessages([...messages, userMessage, { text, user: false }]); // Add bot message to the end
    setLoading(false);
    setUserInput("");

    if (text && !isSpeaking) {
      Speech.speak(text, {
        onDone: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
      });
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setShowStopIcon(false);
    } else if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].text;
      Speech.speak(lastMessage, {
        onDone: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
      });
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    Speech.stop();
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.user ? styles.userMessageContainer : styles.botMessageContainer]}>
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient colors={['#1a2a6c', '#b21f1f', '#fdbb2d']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowHistory(true)} style={styles.historyButton}>
            <Text style={styles.historyButtonText}>History</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Magic Chat</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
            {isSpeaking ? (
              <FontAwesome name="microphone-slash" size={24} color="white" />
            ) : (
              <FontAwesome name="microphone" size={24} color="white" />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
            <Entypo name="paper-plane" size={24} color="white" />
          </TouchableOpacity>
          {
            // Show stop icon only when speaking
            showStopIcon && (
              <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
                <Entypo name="controller-stop" size={24} color="white" />
              </TouchableOpacity>
            )
          }
          {loading && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
        </View>
        <FlashMessage position="top" />
      </LinearGradient>
      
      {/* Modal for displaying message history */}
      <Modal
        visible={showHistory}
        animationType="slide"
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {messages.map((msg, index) => (
              <View key={index} style={[styles.messageContainer, msg.user ? styles.userMessageContainer : styles.botMessageContainer]}>
                <Text style={[styles.messageText, msg.user && styles.userMessage]}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowHistory(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  historyButton: {
    padding: 10,
    backgroundColor: "#4a90e2",
    borderRadius: 20,
  },
  historyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  headerText: { color: "#fff", fontSize: 24, textAlign: "center", fontWeight: 'bold' },
  messagesContainer: { padding: 10, paddingBottom: 80 },
  messageContainer: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessageContainer: { alignSelf: "flex-end", backgroundColor: "#4a90e2" },
  botMessageContainer: { alignSelf: "flex-start", backgroundColor: "#666" },
  messageText: { fontSize: 16, color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopWidth: 1,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 25,
    height: 50,
    color: "white",
    marginHorizontal: 10,
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  sendIcon: {
    padding: 10,
    backgroundColor: "#4a90e2",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#1a2a6c",
    paddingTop: 50,
  },
  scrollViewContent: {
    padding: 20,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    margin: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default GeminiChat;
