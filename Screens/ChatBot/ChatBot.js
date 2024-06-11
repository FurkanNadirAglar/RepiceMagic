
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextInputChange = (text) => {
    setInputText(text);
  };

  const callAPI = async () => {
    setLoading(true);

    const url = 'https://chat-gtp-free.p.rapidapi.com/v1/chat/completions';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': '5a8ac4ed62msh18e36bb8c93ff5ep170825jsnb45018b2c127',
        'X-RapidAPI-Host': 'chat-gtp-free.p.rapidapi.com'
      },
      body: JSON.stringify({
        chatId: '92d97036-3e25-442b-9a25-096ab45b0525',
        messages: [
          {
            role: 'system',
            content: 'You are a virtual assistant. Your name is Karen and you would like to be a firefighter.'
          },
          {
            role: 'user',
            content: inputText
          }
        ]
      })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      setResponseText(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInputText(''); // API çağrısı tamamlandığında input alanını temizle
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTextInputChange}
        value={inputText}
        placeholder="Type something..."
        placeholderTextColor={"#4A4A4A"}

      />
      <Button
        title="Send"
        onPress={callAPI}
      />
      {loading ? (
        <Text style={styles.loading}>Cevap Yükleniyor...</Text>
      ) : (
        <Text style={styles.response}>{responseText}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    width: '96%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius:10,
    alignSelf:"center",
  },
  response: {
    marginTop: 20,
    textAlign: 'center',
    color:"white"
  },
  loading: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  }
});
