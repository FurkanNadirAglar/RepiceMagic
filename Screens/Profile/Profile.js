import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();

  const user = {
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    favorites: [
      { id: '1', title: 'Favorite 1' },
      { id: '2', title: 'Favorite 2' },
      { id: '3', title: 'Favorite 3' },
      // Daha fazla favori öğesi eklenebilir
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonText}>Go to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.favoritesSection}>
        <Text style={styles.sectionTitle}>Recent Favorites</Text>
        <FlatList
          data={user.favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.favoriteTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    padding: 100,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImageContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 50,
    padding: 2,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  favoriteTitle: {
    fontSize: 18,
  },
});
