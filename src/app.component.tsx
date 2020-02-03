import React, { useState } from "react";
import { ImageRequireSource } from "react-native";
import { mapping } from "@eva-design/eva";
import { ApplicationProvider } from "@kitten/theme";
import {
  ThemeContext,
  ThemeContextType,
  ThemeKey,
  themes,
  ThemeStore
} from "@src/core/themes";
import { IconRegistry } from "@kitten/ui";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import * as firebase from 'firebase';

import { DynamicStatusBar } from "@src/components/common";
import {
  ApplicationLoader,
  Assets
} from "./core/appLoader/applicationLoader.component";
import { Router } from "./core/navigation/routes";
import './core/config/firebase.config';

const images: ImageRequireSource[] = [
  require("./assets/images/source/image-profile-5.jpg")
];

const fonts: { [key: string]: number } = {
  "opensans-semibold": require("./assets/fonts/opensans-semibold.ttf"),
  "opensans-bold": require("./assets/fonts/opensans-bold.ttf"),
  "opensans-extrabold": require("./assets/fonts/opensans-extra-bold.ttf"),
  "opensans-light": require("./assets/fonts/opensans-light.ttf"),
  "opensans-regular": require("./assets/fonts/opensans-regular.ttf")
};

const assets: Assets = {
  images: images,
  fonts: fonts
};

const App = () => {
  const [theme, setTheme] = useState("Eva Light");

  const onSwitchTheme = (theme: ThemeKey) => {
    ThemeStore.setTheme(theme).then(() => {
      setTheme(theme);
    });
  };

  const contextValue: ThemeContextType = {
    currentTheme: theme,
    toggleTheme: onSwitchTheme
  };

  return (
    <ApplicationLoader assets={assets}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={contextValue}>
        <ApplicationProvider mapping={mapping} theme={themes[theme]}>
          <DynamicStatusBar currentTheme={theme} />
          <Router />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </ApplicationLoader>
  );
};

export default App;
