import React from "react";
import { Dimensions } from 'react-native';
import { withStyles } from "@kitten/theme";
import AnimatedLoader from "react-native-animated-loader";

const screen = Dimensions.get('window');
const ITEM_WIDTH = screen.width / 2;


const LoaderComponent = ({ visible, ...rest }) => (
  <AnimatedLoader
    visible={visible}
    overlayColor="rgba(255,255,255,0.75)"
    source={require("./loader.json")}
    animationStyle={rest.themedStyle.lottie}
    speed={1}
  />
);

export const Loader = withStyles(LoaderComponent, () => ({
  lottie: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH
  }
}));
