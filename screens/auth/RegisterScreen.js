import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import { styles } from "./styled/RegisterScreen.styled";

import AddAvatar from "../../assets/add.svg";

import Input from "../../Input";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegisterScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPass, onShowPass] = useState(true);
  const [dimensions, setDimension] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const onShow = () => onShowPass((prevShow) => !prevShow);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setState(initialState);
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photo.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.box}>
              <Text style={styles.boxTitle}>Регистрация</Text>
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
              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 15 : 45,
                  width: dimensions,
                }}
              >
                <Input
                  name="login"
                  placeholder="Логин"
                  state={state.login}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                />

                <Input
                  name="email"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="Адрес электронной почты"
                  state={state.email}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                />

                <Input
                  name="password"
                  view={{ style: { marginTop: 16 } }}
                  placeholder="Пароль"
                  state={state.password}
                  setState={setState}
                  setIsShowKeyboard={setIsShowKeyboard}
                  secureTextEntry={showPass}
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 16, top: 148 }}
                  onPress={onShow}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonShow}>Показать</Text>
                </TouchableOpacity>
                {!isShowKeyboard ? (
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={keyboardHide}
                  >
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                ) : null}
                {!isShowKeyboard ? (
                  <TouchableOpacity
                    style={styles.btnSecond}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.btnSecondTitle}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
