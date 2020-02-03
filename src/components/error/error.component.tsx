import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import { Text, Button } from "@kitten/ui";
import { withStyles } from "@kitten/theme";
import { textStyle, ContainerView } from "@src/components/common";
import LottieView from "lottie-react-native";

const screen = Dimensions.get("window");
const ITEM_WIDTH = screen.width / 2;

const ErrorComponent = props => {
  const { themedStyle, errorMessage, onRetryPress } = props;
  return (
    <View style={themedStyle.container}>
      <View style={themedStyle.container}>
        <LottieView
          style={themedStyle.lottie}
          loop={true}
          autoPlay={true}
          ref={animation => {
            this.animation = animation;
          }}
          source={require("./shark.json")}
        />
        <Text style={textStyle.headline}>{errorMessage}</Text>
        <Button
        style={themedStyle.bookButton}
        textStyle={textStyle.button}
        onPress={onRetryPress}
      >
        RETRY
      </Button>
      </View>
    </View>
  );
};

export const Error = withStyles(ErrorComponent, () => ({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  lottie: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH
  },
  bookButton: {
      marginVertical: 10,
  }
}));
