import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import  CommentsScreen  from "./CommentsScreen";
import MapScreen  from "./MapScreen";
import  PostsScreen  from "./PostsScreen";

const Stack = createStackNavigator();

 const NestedScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="PostsScreen">
      <Stack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "MoonDance-Regular",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "MoonDance-Regular",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default NestedScreens