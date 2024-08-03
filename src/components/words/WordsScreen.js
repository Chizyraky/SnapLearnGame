import React, { useState, useEffect } from "react";
import { Alert, View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { db } from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { addWord, removeWord } from "../../firebase/Repository";
import styles from "./Styles";

function WordsScreen() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newDefinition, setNewDefinition] = useState('');

  useEffect(() => {
    const itemListRef = collection(db, "SnapLearn");
    const unsubscribe = onSnapshot(itemListRef, (snapshot) => {
      const words = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWords(words);
    });
    return () => unsubscribe();
  }, []);

  const handleAddWord = async () => {
    if (newWord && newDefinition) {
      const wordData = {
        word: newWord,
        definition: newDefinition,
        hits: 0,
        misses: 0,
      };
      await addWord(wordData);
      setNewWord('');
      setNewDefinition('');
    }
  };

  const handleRemoveWord = async (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this word?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            await removeWord(id);
          }
        }
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a word"
        value={newWord}
        onChangeText={setNewWord}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter the definition"
        value={newDefinition}
        onChangeText={setNewDefinition}
        style={styles.input}
      />
      <Button
        title="Add Word"
        onPress={handleAddWord}
        color="tomato"
      />
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.wordContainer}>
            <Text style={styles.wordText}>{item.word}</Text>
            <Text style={styles.hitsText}>Hits: {item.hits}</Text>
            <Text style={styles.missesText}>Misses: {item.misses}</Text>
            <MaterialIcons
              name="delete"
              size={24}
              color="red"
              onPress={() => handleRemoveWord(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

export default WordsScreen;

