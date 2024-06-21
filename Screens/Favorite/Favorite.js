import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/UserContext"; 
import { useNavigation } from '@react-navigation/native';

const Favorite = () => {
  const { favorites, toggleFavorite } = useAuth();
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes.</Text>
      </View>
    );
  }
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = favorites.filter((item) =>
        item.strMeal.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFavorites(filteredData);
    } else {
      setFilteredFavorites(favorites);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('RepicesDetails', { idMeal: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="#FF6347" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#FFF",
    fontSize: 16,
  },
  emptyText: {
    color: "#FF6347",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  deleteButton: {
    padding: 10,
  },
});

export default Favorite;
