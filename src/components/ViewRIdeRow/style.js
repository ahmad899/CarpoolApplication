import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  topContainer: { width: 200 },
  bottomContainer: { width: 200 },
  text: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 15,
    width: 150,
  },
  bottomtext: {
    color: "black",
    fontWeight: "bold",

    fontSize: 15,
    marginVertical: 1.8,
  },
});
export default styles;
