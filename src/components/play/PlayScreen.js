import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import styles from "./Styles";
import { useState, useEffect } from "react";
import { db } from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { addMiss, addHit } from "../../firebase/Repository";

function PlayScreen() {
  const [words, setWords] = useState([]);

  // Nazmul, you should use this code to get the list of words from the database.
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

  // How to add a hit to a word
  const handleAddHit = async (word) => {
    addHit(word);
  };

  // How to add a miss to a word
  const handleAddMiss = async (word) => {
    addMiss(word);
  };

  return (
    <View style={styles.container}>
      <Text>Words available to be used in the game:</Text>
      <FlatList
        data={words}
        renderItem={({ item }) => (
          <View>
            <Text>Word: {item.word}</Text>
            <Text>Hits: {item.hits}</Text>
            <Text>Misses: {item.misses}</Text>
            <Text>Definition: {item.definition}</Text>
            <Button
              title="Hit"
              onPress={() => handleAddHit(item)}
              color="tomato"
            />
            <Button
              title="Miss"
              onPress={() => handleAddMiss(item)}
              color="tomato"
            />
          </View>
        )}
      />
    </View>
  );
}

export default PlayScreen;
