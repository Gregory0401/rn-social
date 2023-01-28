import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";

import { AntDesign } from "@expo/vector-icons";
import { Feather, EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./ProfileScreen.styled";

export const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();

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

  const getUserPost = () => {
    return posts.filter((post) => post.user === user?.id);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/photo.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.postsContainer}>
          <View style={styles.logoutBtn}>
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              onPress={() => {
                dispatch(authSignOutUser());
              }}
            />
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <View style={styles.avatar}>
            <Image
              source={{ uri: user?.avatar }}
              style={{ width: 120, height: 120, borderRadius: 16 }}
            />
            <TouchableOpacity
              style={styles.avatarBtn}
              activeOpacity={0.7}
              accessibilityLabel="add avatar"
            >
              <View style={{ backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                {!user?.avatar ? (
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                ) : (
                  <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={getUserPost()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    ...styles.photo,
                    width: windowWidth - 16 * 2,
                  }}
                />
                <Text style={styles.photoText}>{item.title}</Text>
                <View style={styles.linksContainer}>
                  <View style={styles.wrap}>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          photo: item.photo,
                          postId: item.id,
                        });
                      }}
                    >
                      <FontAwesome5
                        name="comment-dots"
                        size={25}
                        color="#FF6C00"
                      />
                      <Text style={{ ...styles.count, marginLeft: 6 }}>
                        {item.comments.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.link, marginLeft: 25 }}
                      activeOpacity={0.7}
                      onPress={() => {
                        console.log("like");
                      }}
                    >
                      <EvilIcons name="like" size={35} color="#FF6C00" />
                      <Text style={styles.count}>153</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("MapScreen", {
                        location: item.location,
                      });
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>
                      {item.location.place}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
