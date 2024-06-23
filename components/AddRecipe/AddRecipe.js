import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function AddRecipe({ navigation }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleAddRecipe = () => {
    if (recipeName && ingredients && steps) {
      // You can pass the recipe back to the Profile screen or handle it through a context or global state
      navigation.navigate('Profile', {
        newRecipe: { name: recipeName, ingredients: ingredients.split(','), steps: steps.split('.') },
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
      />
      <Text style={styles.label}>Ingredients (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <Text style={styles.label}>Steps (separated by periods)</Text>
      <TextInput
        style={styles.input}
        placeholder="Steps"
        value={steps}
        onChangeText={setSteps}
      />
      <Button title="Add Recipe" onPress={handleAddRecipe} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
    padding: 20,
  },
  label: {
    color: '#ced4da',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
