import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  photoText: {
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationText: {
    fontFamily: "DMMono-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});