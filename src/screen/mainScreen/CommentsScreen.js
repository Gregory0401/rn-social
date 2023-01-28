import { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Feather } from "@expo/vector-icons";
import { styles } from "./CommentsScreen.styled";

import { addComment } from "../../../redux/posts/postsOperations";

export const CommentsScreen = ({ route }) => {
  const [photo, setPhoto] = useState(null);
  const [postId, setPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      const post = posts.find((post) => post.id === route.params.postId);
      setPostId(route.params.postId);
      setPhoto(route.params.uri);
      setComments(post.comments);
    }
  }, [route.params]);

  useEffect(() => {
    if (postId) {
      const result = posts.find((post) => post.id === postId);
      setComments(result.comments);
    }
  }, [posts]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsShowKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendComment = () => {
    dispatch(
      addComment({
        postId,
        user: user.avatar,
        comment,
        createdAt: Date.now(),
      })
    );
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Image source={{ uri: photo }} style={styles.photo} />
          {!isShowKeyboard && (
            <View>
              <FlatList
                style={{ height: height - 506, marginBottom: 32 }}
                data={comments}
                keyExtractor={(item, indx) => indx.toString()}
                renderItem={({ item }) => {
                  const date = new Date(item.createdAt);
                  const d = date.toLocaleString();
                  console.log(d);
                  return (
                    <View style={styles.commentContainer}>
                      <View style={styles.commentIcon}>
                        <Image
                          style={{ width: 28, height: 28 }}
                          source={{ uri: item.user }}
                        />
                      </View>
                      <View style={styles.commentTextContainer}>
                        <Text style={styles.commentText}>{item.comment}</Text>
                        <Text style={styles.commentTime}>{d}</Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}

          <View style={{ marginTop: isShowKeyboard ? -25 : 0 }}>
            <TextInput
              style={styles.input}
              placeholder={"Комментировать..."}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={(value) => {
                setComment(value);
              }}
              value={comment}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.inputBtn}
              onPress={() => {
                sendComment();
                hideKeyboard();
                setComment("");
              }}
            >
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
