import React, { useState } from "react";
import { View } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button } from "@kitten/ui";
import { ProfileSetting, ProfilePhoto } from "@src/components/social";
import { CameraIconFill } from "@src/assets/icons";
import { ContainerView, textStyle } from "@src/components/common";
import { defaultPic } from "@src/assets/images";

const ProfileSettings1Component = ({
  profile,
  onPhotoButtonPress,
  onButtonPress,
  onLogoutPress,
  ...rest
}) => {
  const { themedStyle } = rest;
  const [tempProfile, setProfile] = useState(profile);
  const renderPhotoButton = () => {
    return (
      <Button
        style={themedStyle.photoButton}
        status="basic"
        icon={CameraIconFill}
        onPress={onPhotoButtonPress}
      />
    );
  };

  const onFieldChange = (fieldChange, fieldValue) => {
    setProfile({
      ...tempProfile,
      [fieldChange]: fieldValue
    });
  };

  const onSaveButtonPress = () => onButtonPress(tempProfile);

  const profilePic = profile.photo
    ? { uri: profile.photo }
    : defaultPic[profile.gender ? profile.gender : "Male"];

  return (
    <ContainerView style={themedStyle.container}>
      <View style={themedStyle.photoSection}>
        <ProfilePhoto
          style={themedStyle.photo}
          source={profilePic}
          button={renderPhotoButton}
        />
      </View>
      <View style={themedStyle.infoSection}>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="First Name"
          value={tempProfile.firstName}
          onChange={newValue => onFieldChange("firstName", newValue)}
        />
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Last Name"
          value={tempProfile.lastName}
          onChange={newValue => onFieldChange("lastName", newValue)}
        />
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Gender"
          value={tempProfile.gender}
        />
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Email"
          value={tempProfile.email}
        />
      </View>
      <Button
        style={themedStyle.button}
        textStyle={textStyle.button}
        size="large"
        onPress={onSaveButtonPress}
      >
        DONE
      </Button>
      <Button
        status='danger'
        style={themedStyle.button}
        textStyle={textStyle.button}
        size="large"
        onPress={onLogoutPress}
      >
        LOG OUT
      </Button>
    </ContainerView>
  );
};

export const ProfileSettings1 = withStyles(
  ProfileSettings1Component,
  (theme: ThemeType) => ({
    container: {
      flex: 1,
      backgroundColor: theme["background-basic-color-2"]
    },
    photoSection: {
      marginVertical: 40
    },
    infoSection: {
      marginTop: 24,
      backgroundColor: theme["background-basic-color-1"]
    },
    contactSection: {
      marginTop: 24,
      backgroundColor: theme["background-basic-color-1"]
    },
    profileSetting: {
      borderBottomWidth: 1,
      borderBottomColor: theme["border-basic-color-2"]
    },
    photo: {
      width: 124,
      height: 124,
      alignSelf: "center"
    },
    photoButton: {
      top: 82,
      width: 48,
      height: 48,
      borderRadius: 24
    },
    button: {
      marginHorizontal: 24,
      marginVertical: 24
    }
  })
);
