import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

const primary = {
  borderColor: "#E8E8E8",
  backgroundColor: "#F6F6F6",
};

const secondary = {
  borderColor: "#FF6C00",
  backgroundColor: "#FFFFFF",
};

const Input = (props) => {
  const [inputBorderColor, setInputBorderColor] = useState(primary);

  const onPressInHandler = (style) => () => {
    setInputBorderColor(style);
  };

  return (
    <View {...(props.view || {})}>
      <TextInput
        style={{ ...styles, ...inputBorderColor }}
        placeholder={props.placeholder}
        onFocus={() => props.setIsShowKeyboard(true)}
        value={props.state}
        onChangeText={(value) =>
          props.setState((prevState) => ({ ...prevState, [props.name]: value }))
        }
        onPressIn={onPressInHandler(secondary)}
        onBlur={onPressInHandler(primary)}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderWidth: 1,
  height: 50,
  borderRadius: 8,
  padding: 16,
  fontSize: 16,
  fontFamily: "DMMono-Regular",
  color: "#212121",
});

export default Input;
