import React from "react";
import { View } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button, Text, Tooltip } from "@kitten/ui";
import {
  ProfileActivityList2,
  ProfileInfo2,
  Metrics,
  SessionList
} from "@src/components/social";
import { SettingsIconOutline } from "@src/assets/icons";
import { defaultPic, addButton, imageSurfboard } from "@src/assets/images";
import { ContainerView, textStyle } from "@src/components/common";
import { EmptyFeed } from "@src/components/social/emptyFeed/emptyFeed.component";
import moment from "moment";

const ProfileComponent = ({
  onLogSessionPress,
  onSessionPress,
  onSurfboardPress,
  onAddSurfboardPress,
  onSettingsPress,
  ...rest
}) => {
  const {
    themedStyle,
    profile,
    location,
    surfboards,
    sessions,
    isTooltipVisible,
    setTooltipVisible
  } = rest;

  const createImageSource = surf => {
    return {
      image: surf.type ? imageSurfboard[surf.type] : imageSurfboard.default
    };
  };

  const toggleTooltip = () => setTooltipVisible(!isTooltipVisible);

  const renderSurfboards = (surfboards = []) => {
    return (
      surfboards.length > 0 && (
        <View key={"surfboards"}>
          <Text style={themedStyle.categoryLabel} category="s1">
            {"Your surfboards"}
          </Text>
          <ProfileActivityList2
            contentContainerStyle={themedStyle.activityList}
            data={[
              ...surfboards.map(createImageSource),
              {
                image: addButton.imageSource,
                onPress: onAddSurfboardPress
              }
            ]}
            onPressDefault={onSurfboardPress}
          />
        </View>
      )
    );
  };

  const renderSessions = (sessions = []) => {
    if (sessions.length > 0) {
      return (
        <View key={"sessions"}>
          <Text style={themedStyle.categoryLabel} category="s1">
            {"Your past sessions"}
          </Text>
          <SessionList
            style={themedStyle.feed}
            data={sessions}
            onItemPress={onSessionPress}
          />
        </View>
      );
    }
    return (
      <View key={"sessions"}>
        <Text style={themedStyle.categoryLabel} category="s1">
          {"Your past sessions"}
        </Text>
        <EmptyFeed onLogSessionPress={onLogSessionPress} />
      </View>
    );
  };

  const computeDurations = (sessions = []) => {
    return sessions.reduce((a, b) => {
      const duration = moment(b.endTime).diff(b.startTime, "minutes");
      const newDuration = a + duration;
      console.log("newD", newDuration);
      return newDuration;
    }, 0);
  };

  const profilePic = profile.photo
    ? { uri: profile.photo }
    : defaultPic[profile.gender ? profile.gender : "Male"];

  return (
    <ContainerView style={themedStyle.container}>
      <ProfileInfo2
        style={themedStyle.profileInfo}
        photo={profilePic}
        name={`${
          profile.displayName
            ? profile.displayName
            : `${profile.firstName} ${profile.lastName}`
        }`}
        location={location}
      />
      <View style={themedStyle.actionContainer}>
        <Tooltip
          visible={isTooltipVisible}
          text="This feature will be available soon"
          onBackdropPress={toggleTooltip}
        >
          <Button
            style={themedStyle.followButton}
            textStyle={textStyle.button}
            onPress={toggleTooltip}
          >
            Predict the next session
          </Button>
        </Tooltip>
        <Button
          textStyle={textStyle.button}
          appearance="ghost"
          icon={SettingsIconOutline}
          onPress={onSettingsPress}
        />
      </View>
      <View>
      {sessions && sessions.length > 0 && (
          <Metrics
            style={themedStyle.profileSocials}
            sessions={sessions.length}
            duration={computeDurations(sessions)}
          />
        )}
      </View>
      <View style={themedStyle.activityContainer}>
        {renderSurfboards(surfboards)}
        {renderSessions(sessions)}
      </View>
    </ContainerView>
  );
};

export const Profile = withStyles(ProfileComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: theme["background-basic-color-1"]
  },
  profileInfo: {
    paddingHorizontal: 24
  },
  actionContainer: {
    flexDirection: "row",
    marginVertical: 32,
    paddingHorizontal: 24
  },
  surfboardsContainer: {
    flexDirection: "row"
  },
  profileSocials: {
    justifyContent: "space-evenly",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: theme["border-basic-color-2"]
  },
  followButton: {
    flex: 1,
    marginRight: 4
  },
  messageButton: {
    flex: 1,
    marginLeft: 4
  },
  activityContainer: {
    paddingVertical: 16,
    backgroundColor: theme["background-basic-color-2"]
  },
  activityList: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  categoryLabel: {
    marginHorizontal: 24,
    marginTop: 8,
    ...textStyle.subtitle
  },
  feed: {
    paddingVertical: 8,
    paddingHorizontal: 24
  }
}));
