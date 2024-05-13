import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const Repices = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    if (selectedCategory) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.strCategory}`);
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    }
  };

  return (
    
    <View style={{ marginTop: 30 }}>
      <Text style={{ fontSize: 25, marginLeft:10 }}>Recipes</Text>
      {recipes.map((recipe) => (
        <View key={recipe.idMeal} style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 10 }}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={{ marginLeft: 10 }}>{recipe.strMeal}</Text>
        </View>
      ))}
    </View>
  );
}

export default Repices
