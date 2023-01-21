import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import AddAvatar from "../../../../assets/add.svg"
import { Feather, EvilIcons } from "@expo/vector-icons";
import { styles } from "./styled/ProfileScreen.styled";

const ProfileScreen = ({ navigation }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../images/photo.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.box}>
              <View style={styles.logoutBtn}>
                <Feather
                  name="log-out"
                  color="#BDBDBD"
                  size={24}
                  onPress={() => {
                    console.log("logout");
                  }}
                />
              </View>
              <Text style={styles.userName}>Natali Romanova</Text>
              <View style={styles.avatar}>
                <TouchableOpacity
                  style={styles.avatarBtn}
                  activeOpacity={0.7}
                  accessibilityLabel="add avatar"
                  onPress={() => console.log("add avatar")}
                >
                  <AddAvatar fill={"#FF6C00"} stroke={"#FF6C00"} />
                </TouchableOpacity>
              </View>

              <View>
                <Image
                  source={require("../../../images/rectangle.jpg")}
                  style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
                />
                <Text style={styles.photoText}>Лес</Text>
                <View style={styles.linksContainer}>
                  <View style={styles.wrap}>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate("CommentsScreen");
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={{ ...styles.count, marginLeft: 6 }}>8</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ ...styles.link, marginLeft: 24 }}
                      activeOpacity={0.7}
                      onPress={() => {
                        console.log("like");
                      }}
                    >
                      <EvilIcons name="like" size={35} color="#BDBDBD" />
                      <Text style={styles.count}>153</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("MapScreen");
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>Ukraine</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};


export default ProfileScreen



