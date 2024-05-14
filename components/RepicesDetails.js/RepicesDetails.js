import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const RecipeDetails = ({ route }) => {
  const { idMeal } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await response.json();
        setRecipeDetails(data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details: ', error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [idMeal]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  if (!recipeDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorMessage}>No recipe details found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{recipeDetails.strMeal}</Text>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <View style={styles.ingredientsContainer}>
          {getIngredients(recipeDetails).map((ingredient, index) => (
            <TouchableOpacity key={index} style={styles.ingredient}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#FF6347" style={{ marginRight: 10 }} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.instructions}>{recipeDetails.strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const getIngredients = (recipeDetails) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipeDetails[`strIngredient${i}`];
    const measure = recipeDetails[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    } else {
      break;
    }
  }
  return ingredients;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  ingredientsContainer: {},
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF6347',
  },
});

export default RecipeDetails;
