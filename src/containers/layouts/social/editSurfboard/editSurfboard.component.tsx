import React from "react";
import { ImageBackground, View } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button, Select, Toggle } from "@kitten/ui";
import { ProfileSetting } from "@src/components/social";
import { ContainerView, textStyle } from "@src/components/common";
import { imageForgotPasswordBg as backupCover } from "@src/assets/images";
import { Types as SurfTypes } from "./surfboard.types";

const EditSurfboardComponent = ({
  surfboard,
  setSurfboard,
  onSaveButtonPress,
  onDeleteButtonPress,
  canToggleDefault,
  canDeleteSurfboard,
  ...rest
}) => {
  const { themedStyle } = rest;

  const onFieldChange = (fieldName, fieldValue) => {
    setSurfboard({
      ...surfboard,
      [fieldName]: fieldValue
    });
  };

  return (
    <ContainerView style={themedStyle.container}>
      <ImageBackground
        style={themedStyle.backgroundImage}
        source={backupCover.imageSource}
      />
      <View style={themedStyle.infoSection}>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Surfboard name (optional)"
          value={surfboard.name}
          onChange={newValue => onFieldChange("name", newValue)}
        />
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Type"
          value={surfboard.type}
        >
          <Select
            style={themedStyle.select}
            data={SurfTypes}
            selectedOption={surfboard.type ? { text: surfboard.type } : null}
            onSelect={newValue => onFieldChange("type", newValue.text)}
          />
        </ProfileSetting>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Is your default surfboard"
          value={surfboard.isDefault}
        >
          <Toggle
            disabled={!canToggleDefault}
            checked={surfboard.isDefault}
            onChange={newValue => onFieldChange("isDefault", newValue)}
          />
        </ProfileSetting>
      </View>
      <Button
        style={themedStyle.button}
        textStyle={textStyle.button}
        size="large"
        onPress={onSaveButtonPress}
      >
        DONE
      </Button>
      {canDeleteSurfboard && <Button
        status='danger'
        style={themedStyle.button}
        textStyle={textStyle.button}
        size="large"
        onPress={onDeleteButtonPress}
      >
        DELETE SURFBOARD
      </Button>}
    </ContainerView>
  );
};

export const EditSurfboard = withStyles(
  EditSurfboardComponent,
  (theme: ThemeType) => ({
    container: {
      flex: 1,
      backgroundColor: theme["background-basic-color-2"]
    },
    backgroundImage: {
      flex: 1,
      minHeight: 280
    },
    infoSection: {
      backgroundColor: theme["background-basic-color-1"]
    },
    profileSetting: {
      borderBottomWidth: 1,
      borderBottomColor: theme["border-basic-color-2"]
    },
    button: {
      marginHorizontal: 24,
      marginVertical: 24
    },
    select: {
      width: 200
    }
  })
);
