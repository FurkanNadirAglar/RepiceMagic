import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused(); 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          setFavorites(JSON.parse(favorites));
        }
      } catch (error) {
        console.error('Error fetching favorites: ', error);
      }
    };

    fetchFavorites();
  }, [isFocused]); 

  const removeFromFavorites = async (itemId) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.idMeal !== itemId);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites: ', error);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RecipeDetails', { idMeal: item.idMeal })}>
      <Image source={{ uri: item.strMealThumb }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.strMeal}</Text>
        <Text style={styles.cardCategory}>{item.strCategory}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromFavorites(item.idMeal)} style={styles.removeButton}>
        <Ionicons name="trash-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filterFavorites = () => {
    return favorites.filter(item => item.strMeal.toLowerCase().includes(searchText.toLowerCase()));
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
      </View>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>No favorites yet</Text>
      ) : (
        <FlatList
          data={filterFavorites()}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCategory: {
    fontSize: 16,
    color: '#666',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorite;
