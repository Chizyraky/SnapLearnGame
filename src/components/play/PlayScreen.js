import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { addHit, addMiss } from "../../firebase/Repository";
import styles from "./Styles";

function PlayScreen({ setIsQuizActive }) {
  const navigation = useNavigation();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackColor, setFeedbackColor] = useState('black');
  const [options, setOptions] = useState([]);
  const scoreRef = useRef(0);
  const [remainingQuestions, setRemainingQuestions] = useState([]);

  useEffect(() => {
    const itemListRef = collection(db, "SnapLearn");

    const subscriber = onSnapshot(itemListRef, {
      next: (snapshot) => {
        const fetchedWords = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWords(fetchedWords);
      },
    });

    return () => subscriber();
  }, []);

  const startQuiz = () => {
    if (words.length < 4) {
      Alert.alert("Please add at least 4 words to start the quiz.");
      return;
    }

    const shuffledWords = words.sort(() => 0.5 - Math.random());
    setRemainingQuestions(shuffledWords);
    scoreRef.current = 0;
    setFeedback("");
    setIsQuizStarted(true);
    setIsQuizActive(true);
    loadNextQuestion(shuffledWords);
  };

  const loadNextQuestion = (questions) => {
    if (questions.length === 0) {
      setIsQuizStarted(false);
      setIsQuizActive(false);
      Alert.alert("Quiz Finished", `You scored ${scoreRef.current} points!`);
      return;
    }

    const current = questions[0];
    setCurrentQuestion(current);
    setOptions(generateOptions(current));
    setRemainingQuestions(questions.slice(1));
  };

  const handleAnswer = (answer) => {
    if (answer === currentQuestion.word) {
      setFeedback("Correct!");
      setFeedbackColor("green");
      scoreRef.current += 1;
      logHit(currentQuestion);
    } else {
      setFeedback("Incorrect!");
      setFeedbackColor("red");
      logMiss(currentQuestion);
    }
    setTimeout(() => {
      setFeedback("");
      loadNextQuestion(remainingQuestions);
    }, 1000);
  };

  const generateOptions = (questionWord) => {
    const options = words
      .filter(word => word.id !== questionWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .concat(questionWord)
      .sort(() => 0.5 - Math.random());

    return options;
  };

  const logHit = async (word) => {
    await addHit(word);
  };

  const logMiss = async (word) => {
    await addMiss(word);
  };

  const exitQuiz = () => {
    Alert.alert("Exit Quiz", "Are you sure you want to exit the quiz?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes", onPress: () => {
          setIsQuizStarted(false);
          setIsQuizActive(false);
          navigation.navigate('Play');
        }
      }
    ]);
  };

  if (!isQuizStarted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.questionText}>{currentQuestion.definition}</Text>
      {options.map(word => (
        <TouchableOpacity
          key={word.id}
          style={styles.answerButton}
          onPress={() => handleAnswer(word.word)}
        >
          <Text style={styles.answerText}>{word.word}</Text>
        </TouchableOpacity>
      ))}
      {feedback ? <Text style={[styles.feedbackText, { color: feedbackColor }]}>{feedback}</Text> : null}
      <Text style={styles.scoreText}>Score: {scoreRef.current}</Text>
      <TouchableOpacity style={styles.exitButton} onPress={exitQuiz}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PlayScreen;
