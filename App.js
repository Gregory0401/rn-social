import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {useRoute} from './src/router'
import * as SplashScreen from "expo-splash-screen";
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(true)
  
  const [fontsLoaded] = useFonts({
    "DMMono-Regular": require("./src/fonts/DMMono-Regular.ttf"),
    "MoonDance-Regular": require("./src/fonts/MoonDance-Regular.ttf")
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

