import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Repices from "../../components/Repices/Repices";

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  // Kullanıcının giriş yaptığı hesabın adı
  const userName = "John Doe";

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => {
          setSelectedCategory(item);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{ backgroundColor: selectedCategory === item ? "yellow" : "transparent", borderRadius: 30 }}>
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={{ width: 70, height: 70, borderRadius: 35 }}
            />
          </View>
          <Text style={{ marginTop: 10 }}>{item.strCategory}</Text>
        </View>
      </TouchableOpacity>

      
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          marginTop: 20,
        }}
      >
        <Image
          source={require("../../assets/avatar.png")}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{userName}</Text>
          <Icon name="bell" size={25} color="gray" style={{ marginLeft: 20 }} />
        </View>
      </View>
      <Text style={{ paddingHorizontal: 30, paddingBottom: 30, fontSize: 30 }}>Make your own food, stay at home</Text>
      <View style={{ paddingHorizontal: 20, paddingBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 25,
            backgroundColor: "silver",
            flex: 1,
          }}
        >
          <TextInput
            placeholder="Search any recipe"
            style={{ marginLeft: 10, flex: 1 }}
          />
          <View style={{ backgroundColor: "white", borderRadius: 20 }}>
            <Icon name="search" size={22} color="black" style={{ padding: 10 }} />
          </View>
        </View>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20 }}
        keyExtractor={(item) => item.idCategory}
        renderItem={renderCategoryItem}
      />
      <Repices selectedCategory={selectedCategory} /> 
    </View>
  );
};

export default HomeScreen;
