import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Repices from "../../components/Repices/Repices";

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const userName = "John Doe";

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === item && styles.selectedCategory,
        ]}
        onPress={() => {
          setSelectedCategory(item);
        }}
      >
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>{item.strCategory}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    console.log("Arama: ", searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <View style={styles.headerRight}>
          <Text style={styles.userName}>{userName}</Text>
          <Icon name="bell" size={25} color="#555" style={styles.bellIcon} />
        </View>
      </View>
      <Text style={styles.mainTitle}>
        Make your own food, stay at home
      </Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search any recipe"
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Icon name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.idCategory}
        renderItem={renderCategoryItem}
      />
      <Repices selectedCategory={selectedCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bellIcon: {
    marginLeft: 20,
  },
  mainTitle: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#FF6347",
    borderRadius: 25,
    padding: 10,
    marginRight: 5,
  },
  categoryList: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedCategory: {
    backgroundColor: "#FF6347",
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 10,
    color: "#333",
    fontWeight: "bold",
  },
});

export default HomeScreen;
