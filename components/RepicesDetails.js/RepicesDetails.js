import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetails = ({ route }) => {
  const { idMeal } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
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

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites) {
          const parsedFavorites = JSON.parse(favorites);
          const isFavorite = parsedFavorites.some((item) => item.idMeal === idMeal);
          setIsFavorite(isFavorite);
        }
      } catch (error) {
        console.error('Error checking if recipe is favorite: ', error);
      }
    };

    checkIfFavorite();
  }, [idMeal]);

  const toggleFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      if (!favorites) {
        favorites = [];
      } else {
        favorites = JSON.parse(favorites);
      }

      if (isFavorite) {
        favorites = favorites.filter((item) => item.idMeal !== idMeal);
        setIsFavorite(false);
      } else {
        favorites.push(recipeDetails);
        setIsFavorite(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error toggling favorite: ', error);
    }
  };

  const handleWatchVideo = () => {
    if (recipeDetails.strYoutube) {
      Linking.openURL(recipeDetails.strYoutube);
    } else {
      console.warn('No video available for this recipe.');
    }
  };

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
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipeDetails.strMealThumb }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {getIngredients(recipeDetails).map((ingredient, index) => (
              <View key={index} style={styles.ingredient}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <View style={styles.instructionsContainer}>
            {getInstructions(recipeDetails.strInstructions).map((step, index) => (
              <View key={index} style={styles.instruction}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {recipeDetails.strYoutube && (
        <TouchableOpacity style={styles.videoButton} onPress={handleWatchVideo}>
          <Ionicons name="play-circle-outline" size={32} color="#FFF" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CommentsScreen')}>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFF" />
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
  return instructions
    .split('. ')
    .filter((instruction) => instruction !== null && instruction.trim() !== '');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6347',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  backButton: {
    marginRight: 10,
  },
  favoriteButton: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '90%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    marginBottom: 20,
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
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    elevation: 1,
  },
  ingredientBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6347',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    elevation: 1,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    elevation: 1,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
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
  videoButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 10,
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
