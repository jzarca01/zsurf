import React from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { ActivityAuthoring } from "@src/components/common";
import { ProfileActivityBar } from "./profileActivityBar.component";
import { RemoteImage } from "@src/assets/images/type";

const SessionItemComponent = ({
  id,
  style,
  name,
  date,
  duration,
  notes,
  msw,
  onPress,
  ...rest
}) => {
  const { themedStyle } = rest;

  const SessionImage = new RemoteImage(`https://source.unsplash.com/800x600/?surf,${name}`);
  
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      {...rest}
      style={[themedStyle.container, style]}
      onPress={onPress}
    >
      <ImageBackground style={themedStyle.photo} source={SessionImage.imageSource} />
      <ProfileActivityBar style={themedStyle.detailsContainer}>
        <ActivityAuthoring name={name} date={date} duration={duration}/>
      </ProfileActivityBar>
    </TouchableOpacity>
  );
};

export const SessionItem = withStyles(
  SessionItemComponent,
  (theme: ThemeType) => ({
    container: {
      overflow: "hidden",
      borderRadius: 12
    },
    detailsContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16
    },
    photo: {
      minHeight: 220
    }
  })
);
