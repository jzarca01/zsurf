import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";

const SpotPhotoComponent = ({ onPress, style, source, ...rest }) => {
  const { themedStyle, ...restProps } = rest;

  return (
    <TouchableOpacity
      {...restProps}
      style={[themedStyle.container, style]}
      onPress={onPress}
    >
      <Image style={themedStyle.image} source={source} />
    </TouchableOpacity>
  );
};

export const SpotPhoto = withStyles(SpotPhotoComponent, (theme: ThemeType) => ({
  container: {
    borderRadius: 8,
    overflow: "hidden"
  },
  image: {
    flex: 1
  },
  description: {}
}));
