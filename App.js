import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {useRoute} from './router'
import * as SplashScreen from "expo-splash-screen";
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true)
  
  const [fontsLoaded] = useFonts({
    "DMMono-Regular": require("./fonts/DMMono-Regular.ttf"),
    "MoonDance-Regular": require("./fonts/MoonDance-Regular.ttf")
  })

  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import {} from "react-native";

// import * as Font from "expo-font";
// import { AppLoading } from "expo";
// import { NavigationContainer } from "@react-navigation/native";
// import {useRoute} from './router'
 

// export default function App() {
//   const routing = useRoute(!null)
  

//   return (
//     <>
//       <NavigationContainer>
//       {routing}
//     </NavigationContainer>
//     </>
//   );
// }
 