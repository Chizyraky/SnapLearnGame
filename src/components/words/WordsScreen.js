import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, FlatList, Button } from "react-native";
import styles from "./Styles";
import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { addWord, removeWord } from "../../firebase/Repository";

function WordsScreen() {
  const [words, setWords] = useState([]);
  const [id, setId] = useState("");

  // Chizy, you should use this code to get the list of words from the database.
  // This code is going to provide a updated list of words from the database every time the list changes.
  // That is, if a new word is added/removed to the database, this code will automatically update the list of words.
  useEffect(() => {
    const itemListRef = collection(db, "SnapLearn");

    const subscriber = onSnapshot(itemListRef, {
      next: (snapshot) => {
        const words = [];
        snapshot.docs.forEach((doc) => {
          words.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setWords(words);
      },
    });
  }, []);

  // How to add a word to the list
  const handleAddWord = async () => {
    const id = await addWord({
      word: "apple",
      definition: "apple",
      hits: 0,
      misses: 0,
    });
    setId(id);
  };

  // How to remove a word from the list
  const handleRemoveWord = async () => {
    removeWord(id);
  };

  return (
    <View style={styles.container}>
      <Text>Words for the list:</Text>
      <Button
        title="Add Apple to the List"
        onPress={handleAddWord}
        color="tomato"
      />
      <Button
        title="Remove Apple to the List"
        onPress={handleRemoveWord}
        color="tomato"
      />
      <FlatList
        data={words}
        renderItem={({ item }) => (
          <View>
            <View>
              <Text>Word: {item.word}</Text>
              <Text>Hits: {item.hits}</Text>
              <Text>Misses: {item.misses}</Text>
              <Text>Definition: {item.definition}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default WordsScreen;
