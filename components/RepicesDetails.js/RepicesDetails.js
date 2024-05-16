import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RecipeDetails = ({ route }) => {
  const { idMeal } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipeDetails.strMeal}</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {getIngredients(recipeDetails).map((ingredient, index) => (
              <View key={index} style={styles.ingredient}>
                <Ionicons name="checkmark-circle" size={24} color="#FF6347" style={{ marginRight: 10 }} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.instructionsContainer}>
            {getInstructions(recipeDetails.strInstructions).map((step, index) => (
              <View key={index} style={styles.instruction}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="heart-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
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

const getInstructions = (instructions) => {
  return instructions.split('\n').filter(instruction => instruction);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347',
    borderBottomWidth: 2,
    borderBottomColor: '#FF6347',
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
    marginRight: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#FF6347',
    borderRadius: 30,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF6347',
  },
});

export default RecipeDetails;
