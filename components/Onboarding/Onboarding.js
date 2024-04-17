import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Slide1 = () => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <Text style={styles.description}>Uygulamamızı kullanmaya başlamak için ilk adımı atın.</Text>
      </View>
    );
  };
  
  const Slide2 = () => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>İkinci Adım</Text>
        <Text style={styles.description}>İkinci adımı tamamlayarak devam edin.</Text>
      </View>
    );
  };
  
  const Slide3 = ({ onComplete }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>Son Adım</Text>
        <Text style={styles.description}>Son adımı tamamlayarak onboarding işlemini bitirin.</Text>
        <Button title="Tamamla" onPress={onComplete} />
      </View>
    );
  };
  
  const OnboardingScreen = ({ onComplete }) => {
    return (
      <ScrollView contentContainerStyle={styles.container} pagingEnabled horizontal>
        <Slide1 />
        <Slide2 />
        <Slide3 onComplete={onComplete} />
        <StatusBar style="auto" />
      </ScrollView>
    );
  };
  
  const MainAppScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Uygulamanın Ana Ekranı</Text>
        <StatusBar style="auto" />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
    },
  });
