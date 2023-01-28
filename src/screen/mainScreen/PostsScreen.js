import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { subscribePosts } from "../../redux/postsOperations";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./styled/PostsScreen.styled";

export const PostsScreen = ({ navigation, route }) => {
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

  useEffect(() => {
    dispatch(subscribePosts());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16, width: 60, height: 60 }}
          source={{ uri: user?.avatar }}
        />
        <View>
          <Text style={{ fontFamily: "DMMono-Regular", fontSize: 16 }}>
            {user?.name}
          </Text>
          <Text style={{ fontFamily: "DMMono-Regular", fontSize: 12 }}>
            {user?.email}
          </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
            />
            <Text style={styles.photoText}>{item.title}</Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    uri: item.photo,
                    postId: item.id,
                  });
                }}
              >
                <FontAwesome5 name="comment-dots" size={25} color="#FF6C00" />
                <Text style={{ ...styles.count, marginLeft: 6 }}>
                  {item.comments?.length}
                </Text>
              </TouchableOpacity>
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
                <Text style={styles.locationText}>{item.location?.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
