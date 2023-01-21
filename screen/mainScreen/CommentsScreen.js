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
} from "react-native";
import { styles } from "./styled/CommentsScreen.styled";
import { Feather } from "@expo/vector-icons";


 const CommentsScreen = ({ route }) => {


  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.uri);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Image source={{ uri: photo }} style={styles.photo} />

          <View>
            <TextInput
              style={styles.input}
              placeholder={"Комментировать..."}
              placeholderTextColor={"#BDBDBD"}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputBtn}>
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen