import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { styles } from "./styled/CreateScreen.styled";
import { addPost } from "../../redux/postsOperations";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  photoUri: "",
  photoName: "",
  photoLocation: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);

  const locationRef = useRef();

  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const user = useSelector((state) => state.auth.user);
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
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      };
      setLocationCoords(coords);
    })();
  }, []);

  const getLocation = async () => {
    const photoPlace = await Location.reverseGeocodeAsync(locationCoords);
    const placeLocation = {
      ...locationCoords,
      place: `${photoPlace[0].region}, ${photoPlace[0].country}`,
    };
    handlerChangeText(placeLocation, "photoLocation");
  };

  const takePhoto = async () => {
    if (!camera) return;
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const photo = await camera?.takePictureAsync();
    await getLocation();
    setState((prevState) => ({ ...prevState, photoUri: photo.uri }));
    if (state.photoLocation && state.photoName) {
      setIsDisabled(false);
    }
  };

  const handlerChangeText = (value, inputName) => {
    setState((prevState) => ({ ...prevState, [inputName]: value }));
    if (inputName === "photoName") {
      if (state.photoLocation && state.photoUri && value) {
        setIsDisabled(false);
      }
    } else {
      if (state.photoName && state.photoUri) {
        setIsDisabled(false);
      }
    }
    if (!value) {
      setIsDisabled(true);
    }
  };

  const onFormSubmit = async () => {
    setState(initialState);
    setIsDisabled(true);
    Keyboard.dismiss();
    const post = {
      title: state.photoName,
      photo: state.photoUri,
      location: state.photoLocation,
      id: user.id,
    };
    dispatch(addPost(post));
    navigation.navigate("PostsScreen", { post });
  };

  const handleDelete = () => {
    setState(initialState);
    setIsDisabled(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView>
          {state.photoUri ? (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <Image
                  source={{ uri: state.photoUri }}
                  style={{
                    width: windowWidth - 16 * 2,
                    height: 240,
                  }}
                />
                <TouchableOpacity
                  style={styles.photoBtn}
                  activeOpacity={0.7}
                  onPress={() => {
                    setState((prevState) => ({
                      ...prevState,
                      photoUri: null,
                    }));
                    setIsDisabled(true);
                  }}
                >
                  <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Редактировать фото</Text>
            </View>
          ) : (
            <View>
              <View
                style={{ ...styles.imgHolder, width: windowWidth - 16 * 2 }}
              >
                <Camera style={styles.camera} ref={setCamera}>
                  <TouchableOpacity
                    style={styles.cameraBtn}
                    activeOpacity={0.7}
                    onPress={takePhoto}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                </Camera>
              </View>
              <Text style={styles.text}>Загрузите фото</Text>
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Название"
                value={state.photoName}
                onSubmitEditing={() => {
                  locationRef.current.focus();
                }}
                onChangeText={(value) => {
                  handlerChangeText(value, "photoName");
                }}
              />

              <View style={styles.locationIcon}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </View>
              <TextInput
                ref={locationRef}
                style={{
                  ...styles.input,
                  paddingLeft: 32,
                }}
                placeholder="Местность"
                value={state.photoLocation?.place}
                onChangeText={(value) => {
                  handlerChangeText(value, "photoLocation");
                }}
              />
            </View>
            <View style={styles.screenContainer}>
              {!isKeyboardShown && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    ...styles.appButtonContainer,
                    backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
                  }}
                  onPress={() => {
                    onFormSubmit();
                  }}
                  disabled={isDisabled}
                >
                  <Text
                    style={{
                      ...styles.appButtonText,
                      color: isDisabled ? "#BDBDBD" : "#FFFFFF",
                    }}
                  >
                    Опубликовать
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
          <View style={styles.deliteContainer}>
            <TouchableOpacity
              style={styles.deliteBtn}
              activeOpacity={0.7}
              onPress={() => {
                handleDelete();
              }}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
