import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatar: {
    position: "absolute",
    right: "50%",
    top: 0,
    transform: [{ translateX: 60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 19,
    left: 105,
    width: 25,
    height: 25,
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 75,
    alignItems: "center",
  },
  userName: {
    fontSize: 30,
    fontFamily: "DMMono-Regular",
    textAlign: "center",
    marginBottom: 32,
    color: "#212121",
  },
  logoutBtn: {
    position: "absolute",
    top: 20,
    right: 16,
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
  wrap: {
    flexDirection: "row",
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