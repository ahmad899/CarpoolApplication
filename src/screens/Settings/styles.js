import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#ad462f",
  },
  subContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "90%",
    margin: 10,
    borderRadius: 50,
  },
  row: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "#ad462f",
  },
  rowText: {
    color: "white",
    fontSize: 30,
    marginHorizontal: 10,
  },
});
