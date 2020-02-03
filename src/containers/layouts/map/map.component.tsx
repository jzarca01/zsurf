import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button, Text } from "@kitten/ui";
import { textStyle } from "@src/components/common";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import { SpotMarker } from "./SpotMarker.component";
import { You } from "./You.component";

import Carousel from "react-native-snap-carousel";

const screen = Dimensions.get("window");

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const ITEM_PREVIEW_HEIGHT = 150;

const MapComponent = ({
  region,
  onRegionChange,
  position,
  markers,
  index,
  onIndexChange,
  goToSpot,
  ...rest
}) => {
  const { themedStyle } = rest;

  useEffect(() => {
    this._mapView.animateToRegion(region, 300);
  }, [region]);

  const renderItem = ({ item }) => (
    <View style={themedStyle.item} key={item.id}>
      <View style={themedStyle.spotContainer}>
        <Text style={themedStyle.itemLabel}>{item.name}</Text>
        {!item.isPosition && (
          <Button
            size="large"
            style={themedStyle.itemButton}
            textStyle={textStyle.button}
            onPress={() => goToSpot(item.id, item)}
          >
            VIEW SPOT
          </Button>
        )}
        {item.isPosition && (
          <View style={{ marginVertical: 10 }}>
            <Text style={themedStyle.itemDescription}>{item.description}</Text>
            <Text style={themedStyle.itemDescription}>
              Swipe to see them all !
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={themedStyle.container}>
      <MapView
        ref={c => (this._mapView = c)}
        provider={PROVIDER_DEFAULT}
        style={themedStyle.map}
        initialRegion={region}
        onRegionChange={onRegionChange}
      >
        {position && (
          <Marker key={`you`} coordinate={position}>
            <You className="" height={40} />
          </Marker>
        )}
        {markers.map((marker, i) => {
          return (
            !marker.isPosition && (
              <Marker
                key={`spot-${marker.id}`}
                coordinate={marker}
                onPress={() => {
                  this._carousel.snapToItem(i);
                  this._carousel.props.onSnapToItem(i);
                }}
              >
                <SpotMarker selected={i === index} />
              </Marker>
            )
          );
        })}
      </MapView>
      {markers.length > 0 && (
        <View style={themedStyle.itemContainer}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={markers}
            layout={"default"}
            itemWidth={screen.width}
            sliderWidth={screen.width}
            sliderHeight={50}
            renderItem={renderItem}
            enableMomentum={false}
            enableSnap={true}
            decelerationRate={0.83}
            snapToAlignment={"start"}
            onSnapToItem={onIndexChange}
            lockScrollWhileSnapping
          />
        </View>
      )}
    </View>
  );
};

export const Map = withStyles(MapComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme["background-basic-color-1"],
    ...StyleSheet.absoluteFillObject
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: "20 20 0 0",
    paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW,
    position: "absolute",
    bottom: -10,
    height: ITEM_PREVIEW_HEIGHT,
    width: screen.width
  },
  map: {
    backgroundColor: "transparent",
    ...StyleSheet.absoluteFillObject
  },
  item: {
    width: ITEM_WIDTH,
    height: ITEM_PREVIEW_HEIGHT,
    backgroundColor: "white",
    marginHorizontal: ITEM_SPACING / 2,
    overflow: "hidden",
    borderColor: "#000"
  },
  spotContainer: {
    marginVertical: 10,
    marginHorizontal: 24
  },
  itemLabel: {
    color: "black",
    ...textStyle.headline
  },
  itemDescription: {
    ...textStyle.subtitle
  },
  itemButton: {
    marginTop: 10
  }
}));
