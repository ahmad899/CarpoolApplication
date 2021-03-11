import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ad462f" },
  row: {
    flexDirection: "column-reverse",
  },
  TypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "white",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  buttonContainer: {
    backgroundColor: "white",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 20,
  },
  buttonText: { margin: 10, fontSize: 16, fontWeight: "bold" },
});
export default styles;
