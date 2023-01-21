import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, FlatList, } from "react-native";
import { Feather } from "@expo/vector-icons"


const PostsScreen = ({ navigation, route }) => {
    
  const [posts, setPosts] = useState([]);

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
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);



  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16 }}
          source={require("../../assets/images/User.jpg")}
        />
        <View>
          <Text style={{ fontFamily: "Roboto-Medium", fontSize: 13 }}>
            Natali Romanova
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular", fontSize: 11 }}>
            email@example.com
          </Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image
              source={{ uri: item.post.photo }}
              style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
            />
            <Text style={styles.photoText}>{item.post.title}</Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    uri: item.post.photo,
                  });
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.count, marginLeft: 6 }}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    location: item.post.location,
                  });
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>
                  {item.post.location.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logout:{
      marginBottom:70
  }
});

export default PostsScreen;