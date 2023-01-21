import React from "react"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/auth/LoginScreen"
import RegisterScreen from "./screens/auth/RegisterScreen"
import  HomeScreen  from "./screen/mainScreen/HomeScreen"


const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();


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
  }
    

// import React from "react"
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import LoginScreen from "./LoginScreen"
// import RegisterScreen from "./RegisterScreen"
// import PostsScreen from "./screen/mainScreen/PostsScreen"
// import CreateScreen from "./screen/mainScreen/CreateScreen"
// import ProfileScreen from "./screen/mainScreen/ProfileScreen"
// import {MaterialCommunityIcons} from '@expo/vector-icons'
// import { AntDesign } from "@expo/vector-icons";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

// export const useRoute = (isAuth) => {
//     if (!isAuth) {
//       return (
//         <AuthStack.Navigator>
//           <AuthStack.Screen
//             options={{
//               headerShown: false,
//             }}
//             name="Login"
//             component={LoginScreen}
//           />
//           <AuthStack.Screen
//             options={{
//               headerShown: false,
//             }}
//             name="Register"
//             component={RegisterScreen}
//           />
//         </AuthStack.Navigator>
//       );
//     }
//     return (
      
//       <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
         
//         <MainTab.Screen
//           options={{
//             tabBarIcon: ({ focused, size, color }) => (
//               <MaterialCommunityIcons
//                 name="postage-stamp"
//                 size={size}
//                 color={color}
//               />
//             ), headerShown: false
//           }}
//           name="Posts"
//           component={PostsScreen}
//         />       
//         <MainTab.Screen
//           options={{
//             tabBarIcon: ({ focused, size, color }) => (
//               <AntDesign name="pluscircleo" size={35} color={color} />
//             ), headerShown: false
//           }}
//           name="Create"
//           component={CreateScreen}
//         />
//         <MainTab.Screen
//           options={{
//             tabBarIcon: ({ focused, size, color }) => (
//               <AntDesign name="bars"
//                 size={size}
//                 color={color}
//               />
//             ), headerShown: false
//           }}
//           name="Profile"
//           component={ProfileScreen}
//         />
//       </MainTab.Navigator>
       
//     );
//   };