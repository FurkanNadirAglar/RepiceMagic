import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary

export default function MyRecipes() {
  const { recipes } = useAuth();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.recipeName}>{item.name}</Text>
      <Text style={styles.label}>Ingredients:</Text>
      {item.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.text}>{ingredient}</Text>
      ))}
      <Text style={styles.label}>Steps:</Text>
      {item.steps.map((step, index) => (
        <Text key={index} style={styles.text}>{step}</Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background color
    padding: 20,
  },
  card: {
    backgroundColor: '#343a40',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ced4da',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
});
