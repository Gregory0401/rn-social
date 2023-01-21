import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  photo: {
    height: 240,
    marginBottom: 32,
  },
  input: {
    height: 50,
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 50,
  },
  inputBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});