import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'tomato',
    padding: 20,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  answerButton: {
    backgroundColor: 'lightgray',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  answerText: {
    fontSize: 18,
    color: '#333'
  },
  feedbackText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30
  },
  exitButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    width: '50%',
    alignItems: 'center',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
