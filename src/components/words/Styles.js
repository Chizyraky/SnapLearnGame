import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 1,
  },
  wordText: {
    flex: 2,
  },
  hitsText: {
    flex: 1,
  },
  missesText: {
    flex: 1,
  },
});

export default styles;