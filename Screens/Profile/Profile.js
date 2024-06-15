import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, Animated, Easing } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary

export default function Profile() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const { username } = useAuth(); // Access username from context

  const user = {
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    email: username,
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA"
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  // Animation for shimmer effect
  const animatedValue = new Animated.Value(0);

  const animateShimmer = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => animateShimmer());
  };

  React.useEffect(() => {
    animateShimmer();
  }, []);

  // Interpolated value for shimmer effect
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 400],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
          <Image 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.info}>{user.phone}</Text>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.info}>{user.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#343a40', // Darker header background
    borderBottomWidth: 1,
    borderBottomColor: '#495057',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderWidth: 3,
    borderColor: '#ced4da',
    borderRadius: 75,
    padding: 3,
    marginBottom: 20,
    position: 'relative',
  },
  shimmer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.3,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 2,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#e9ecef',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  infoSection: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ced4da', // Lighter text color
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: '#ffffff', // White text color
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007bff', // Accent color for buttons
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
