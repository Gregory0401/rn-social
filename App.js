import { useCallback } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import { View } from "react-native";

import { Main } from "./src/components/Main";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "DMMono-Regular": require("./src/fonts/DMMono-Regular.ttf"),
    "MoonDance-Regular": require("./src/fonts/MoonDance-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
}
