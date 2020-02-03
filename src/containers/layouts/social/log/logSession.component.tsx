import React from "react";
import { ImageBackground, View, Dimensions } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button, Select } from "@kitten/ui";
import { Datepicker } from "./datepicker.component";
import StarRating from "react-native-star-rating";
import { ProfileSetting } from "@src/components/social";
import { ContainerView, textStyle } from "@src/components/common";
import { imageForgotPasswordBg as backupCover } from "@src/assets/images";
import Textarea from "react-native-textarea";
import moment from 'moment';
import hdate from 'human-date';

const LogSessionComponent = ({
  spot,
  report,
  setReport,
  userSurfboards,
  minDate,
  maxDate,
  canSave,
  onSaveButtonPress,
  ...rest
}) => {
  const { themedStyle } = rest;

  const onFieldChange = (fieldName, fieldValue) => {
    setReport({
      ...report,
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
          hint="Spot"
          value={spot.name}
        />
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Session start datetime"
          value={hdate.prettyPrint(moment(report.startTime))}
        >
          <Datepicker
            placeholder={!report.startTime ? "Set start date" : null}
            date={report.startTime}
            minDate={minDate}
            maxDate={report.endTime ? report.endTime : maxDate}
            onDateChange={date => onFieldChange("startTime", date)}
          />
        </ProfileSetting>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Session end datetime"
          value={hdate.prettyPrint(moment(report.endTime))}
        >
          <Datepicker
            placeholder={!report.endTime ? "Set end date" : null}
            minDate={report.startTime ? report.startTime : minDate}
            maxDate={maxDate}
            date={report.endTime}
            onDateChange={date => onFieldChange("endTime", date)}
          />
        </ProfileSetting>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Your rating"
          value={report.rating}
        >
          <StarRating
            disabled={false}
            maxStars={5}
            rating={report.rating}
            selectedStar={rating => onFieldChange("rating", rating)}
          />
        </ProfileSetting>
        <ProfileSetting
          style={themedStyle.profileSetting}
          hint="Surfboard Used"
          value={report.surfboardUsed}
        >
          <Select
            style={themedStyle.select}
            data={userSurfboards.map(surf => ({text: surf.name, ...surf}))}
            selectedOption={report.surfboardUsed ? { text: report.surfboardUsed.name } : null}
            onSelect={newValue => onFieldChange("surfboardUsed", userSurfboards[newValue.id])}
          />
        </ProfileSetting>
        {false && (<ProfileSetting
          style={{
            container: {
              flexDirection: 'column',
              ...themedStyle.profileSetting
            },
            hint: {
              textAlign: 'left'
            }
          }}
          hint="Your notes"
          value={report.notes}
        >
          <Textarea
            containerStyle={themedStyle.textareaContainer}
            style={themedStyle.textarea}
            onChangeText={newValue => onFieldChange("notes", newValue)}
            defaultValue={report.notes}
            maxLength={120}
            placeholder={"Your notes and observations here..."}
            placeholderTextColor={"#c7c7c7"}
            underlineColorAndroid={"transparent"}
          />
        </ProfileSetting>)}
      </View>
      <Button
        style={themedStyle.button}
        textStyle={textStyle.button}
        size="large"
        onPress={onSaveButtonPress}
        disabled={!canSave}
      >
        DONE
      </Button>
    </ContainerView>
  );
};

export const LogSession = withStyles(
  LogSessionComponent,
  (theme: ThemeType) => ({
    container: {
      backgroundColor: theme["background-basic-color-2"],
      width: Dimensions.get("screen").width
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
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: "#F5FCFF"
    },
    textarea: {
      textAlignVertical: "top", // hack android
      height: 170,
      fontSize: 14,
      color: "#333"
    },
    select: {
      width: 200
    }
  })
);
