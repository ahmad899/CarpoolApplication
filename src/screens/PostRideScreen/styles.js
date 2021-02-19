import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { height: "56%" },
  formContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: "50%",
    backgroundColor: "#ad462f",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginBottom: -10,
  },

  inputContainer: {
    top: 0,
    position: "absolute",
    margin: 10,
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center",
    width: "100%",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },

  textInput: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
    width: "90%",
    padding: 5,
    borderRadius: 50,
  },
  buttonContainer: {
    position: "relative",
    width: "100%",
  },
  button: {
    padding: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default styles;
