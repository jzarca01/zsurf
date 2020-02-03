import React from "react";
import { View } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button, Text } from "@kitten/ui";
import { textStyle } from "@src/components/common";
import LottieView from "lottie-react-native";

const EmptyFeedComponent = ({ onLogSessionPress, themedStyle }) => (
  <View style={themedStyle.container}>
    <LottieView source={require("./emptyFeed.json")} autoPlay autoSize loop />
    <View style={themedStyle.actionContainer}>
      <Text style={themedStyle.text}>There are no sessions to show yet</Text>
      <Button
        style={themedStyle.followButton}
        textStyle={textStyle.button}
        onPress={onLogSessionPress}
      >
        Log a session
      </Button>
    </View>
  </View>
);

export const EmptyFeed = withStyles(EmptyFeedComponent, (theme: ThemeType) => ({
  container: {
    flex: 1
  },
  actionContainer: {
      width: '100%',
    position: "absolute",
    flexDirection: "column",
    justifyItems: "space-around",
    marginVertical: 32,
    paddingHorizontal: 32
  },
  followButton: {
    flex: 1,
    marginRight: 4
  },
  text: {
    width: "100%",
    height: "100%",
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: "row"
  }
}));
