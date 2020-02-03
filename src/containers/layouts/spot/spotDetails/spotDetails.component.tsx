import React from "react";
import { ImageBackground, View, Dimensions } from "react-native";
import { ThemedComponentProps, ThemeType, withStyles } from "@kitten/theme";
import { Button, Text } from "@kitten/ui";
import HTML from "react-native-render-html";
import { createOpenLink } from "react-native-open-maps";

import { imageForgotPasswordBg as backupCover } from "@src/assets/images";

import {
  SpotPhotoList,
  PriceText,
  HighlightTags
} from "@src/components/ecommerce";
import { Apartment } from "@src/core/model";
import { ContainerView, textStyle } from "@src/components/common";

interface ComponentProps {
  spot: Apartment;
  onBookPress: () => void;
  onPhotoPress: (index: number) => void;
}

export type SpotDetailsProps = ThemedComponentProps & ComponentProps;

const SpotDetailsComponent = ({ spot, onLogSessionPress, ...rest }) => {
  const { themedStyle } = rest;
  const { surf_spot_images } = spot;

  const openDirections = () => createOpenLink({ ...spot, query: spot.name });

  const coverImage =
    surf_spot_images.length > 0
      ? { uri: surf_spot_images[0].image_url }
      : backupCover.imageSource;

  return (
    <ContainerView style={themedStyle.container}>
      <ImageBackground
        style={themedStyle.backgroundImage}
        source={coverImage}
      />
      <View style={themedStyle.infoContainer}>
        <View style={themedStyle.detailsContainer}>
          <Text style={themedStyle.titleLabel} category="h6">
            {spot.name}
          </Text>
          <Text style={themedStyle.rentLabel} appearance="hint" category="p2">
            Quality score
          </Text>
          <View style={themedStyle.bookContainer}>
            <PriceText
              style={themedStyle.priceLabel}
              valueStyle={themedStyle.priceValueLabel}
              scaleStyle={themedStyle.priceScaleLabel}
              scale="5"
            >
              {spot.quality_score}
            </PriceText>
            <View>
              <Button
                style={themedStyle.bookButton}
                textStyle={textStyle.button}
                onPress={openDirections}
              >
                GET DIRECTIONS
              </Button>
            </View>
          </View>
        </View>
        <View style={themedStyle.buttons}>
          <Button
            style={themedStyle.bookButton}
            appearance="outline"
            textStyle={textStyle.button}
            onPress={onLogSessionPress}
          >
            LOG A SESSION
          </Button>
        </View>
        <View style={themedStyle.facilitiesContainer}>
          <HighlightTags
            style={themedStyle.primaryFacilityList}
            data={spot.highlights}
            onItemPress={this.onPrimaryFacilityPress}
          />
        </View>
      </View>
      {surf_spot_images.length > 1 && (
        <View style={themedStyle.photoSection}>
          <Text
            style={[themedStyle.sectionLabel, themedStyle.photoLabel]}
            category="s1"
          >
            Photos
          </Text>
          <SpotPhotoList
            contentContainerStyle={themedStyle.photoList}
            data={surf_spot_images.slice(1, 5)}
            onItemPress={() => {}}
          />
        </View>
      )}
      {spot.note !== null && (
        <View style={themedStyle.aboutSection}>
          <HTML
            html={spot.note}
            style={themedStyle.aboutLabel}
            appearance="hint"
          />
        </View>
      )}
    </ContainerView>
  );
};

export const SpotDetails = withStyles(
  SpotDetailsComponent,
  (theme: ThemeType) => ({
    container: {
      backgroundColor: theme["background-basic-color-2"],
      width: Dimensions.get("screen").width
    },
    backgroundImage: {
      flex: 1,
      minHeight: 280
    },
    infoContainer: {
      marginTop: -80,
      marginHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme["background-basic-color-1"]
    },
    detailsContainer: {
      paddingHorizontal: 24,
      paddingVertical: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme["border-basic-color-2"]
    },
    bookContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    facilitiesContainer: {
      paddingHorizontal: 24,
      paddingVertical: 24
    },
    primaryFacilityList: {
      paddingVertical: 16
    },
    facilityList: {
      paddingVertical: 12
    },
    aboutSection: {
      marginHorizontal: 24,
      marginVertical: 24
    },
    photoSection: {
      marginVertical: 8
    },
    photoList: {
      marginHorizontal: 16,
      marginVertical: 16
    },
    titleLabel: textStyle.headline,
    rentLabel: {
      marginTop: 24,
      ...textStyle.paragraph
    },
    buttons: {
      flexDirection: "row",
      marginVertical: 4,
      paddingHorizontal: 24
    },
    bookButton: {
      flex: 1,
      marginHorizontal: 4
    },
    priceLabel: {
      marginTop: 8
    },
    priceValueLabel: {
      fontFamily: "opensans-bold",
      fontSize: 26,
      lineHeight: 32
    },
    priceScaleLabel: {
      fontSize: 13,
      lineHeight: 24,
      ...textStyle.paragraph
    },
    sectionLabel: textStyle.subtitle,
    aboutLabel: {
      marginVertical: 16,
      ...textStyle.paragraph
    },
    photoLabel: {
      marginHorizontal: 24
    }
  })
);
