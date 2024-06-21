import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/UserContext';

const CommentsScreen = ({ navigation, route }) => {
  const { idMeal } = route.params;
  const { username, comments, addComment } = useAuth();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      addComment(idMeal, { user: username, text: newComment });
      setNewComment('');
    }
  };

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Ionicons name="close" size={24} color="#FF6347" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Comments</Text>
      <ScrollView style={styles.commentsContainer}>
        {comments[idMeal] && comments[idMeal].map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.commentUser}>{comment.user}:</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Post" onPress={handleAddComment} color="#FF6347" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 20,
  },
  commentsContainer: {
    flex: 1,
  },
  comment: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#FF6347',
    marginRight: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default CommentsScreen;
