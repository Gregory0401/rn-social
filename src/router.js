import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import HomeScreen from "./screen/mainScreen/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        {!isAuth ? (
          <>
            <AuthStack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <AuthStack.Screen
              options={{
                headerShown: false,
              }}
              name="Register"
              component={RegisterScreen}
            />
          </>
        ) : (
          <AuthStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
      </AuthStack.Navigator>
    );
  }
};
