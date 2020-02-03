import React from "react";
import { View } from "react-native";
import { ImageOverlay } from "./extra/image-overlay.component";
import StarRating from "react-native-star-rating";
import { ProfileParameter } from "./extra/profile-parameter.component";
import { SafeAreaView } from "@src/core/navigation";
import { ThemeType, withStyles } from "@kitten/theme";
import { Text, TopNavigation, TopNavigationAction } from "@kitten/ui";
import moment from "moment";
import humanize from "tiny-human-time";
import hdate from "human-date";
import { RemoteImage } from "@src/assets/images/type";

const SessionComponent = ({ session, ...rest }) => {
  const { themedStyle } = rest;

  const getDuration = (startDate, endDate) => {
    return humanize(moment(startDate), moment(endDate));
  };

  const getHumanDate = date => hdate.prettyPrint(moment(date));

  const SessionImage = new RemoteImage(
    `https://source.unsplash.com/800x600/?surf,${session.name}`
  );

  const displaySurf = () => {
    if (session.surfboardUsed) {
      const surf = session.surfboardUsed;
      let displayedSurf = "";
      if (surf.name && surf.type) {
        return `${surf.name} (${surf.type})`;
      } else if (surf.name) {
        return surf.name;
      } else {
        return surf.type;
      }
    }
  };

  return (
    <View style={themedStyle.container}>
      <ImageOverlay
        style={themedStyle.container}
        source={SessionImage.imageSource}
      >
        <View style={themedStyle.profileDetailsContainer}>
          <Text style={themedStyle.profileName} category="h1" status="control">
            Your session on {getHumanDate(session.startTime)}
          </Text>
          <Text
            style={themedStyle.profileLocation}
            category="h6"
            status="control"
          >
            {session.name}
          </Text>
          <StarRating disabled={true} maxStars={5} rating={session.rating} />
          <View style={themedStyle.profileParametersContainer}>
            <ProfileParameter
              hint="Duration"
              value={`${getDuration(session.startTime, session.endTime)}`}
            />
            {session.surfboardUsed && (
              <ProfileParameter hint="Surfboard used" value={displaySurf()} />
            )}
          </View>
        </View>
      </ImageOverlay>
    </View>
  );
};

export const Session = withStyles(SessionComponent, (theme: ThemeType) => ({
  container: {
    flex: 1
  },
  profileDetailsContainer: {
    position: "absolute",
    paddingHorizontal: 24,
    paddingBottom: 32,
    left: 0,
    right: 0,
    bottom: 0
  },
  profileName: {
    marginVertical: 16
  },
  profileLocation: {
    marginVertical: 8
  },
  profileParametersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 64
  }
}));
