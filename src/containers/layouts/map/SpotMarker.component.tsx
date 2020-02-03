import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { WaveIcon } from "./WaveIcon";

const SpotMarker = ({ selected, style, isPosition, onPress }) => (
  <View style={[styles.container, style]}>
    <View style={styles.bubble}>
      {isPosition ? (
        <Text>You are here</Text>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <WaveIcon height={40} selected={selected} />
        </TouchableOpacity>
      )}
    </View>
    <View style={[styles.arrowBorder]} />
    <View style={[styles.arrow]} />
  </View>
);

SpotMarker.propTypes = {
  amount: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  style: PropTypes.any,
  isPosition: PropTypes.bool,
  onPress: PropTypes.func
};

SpotMarker.defaultProps = {
  amount: 1,
  isPosition: false,
  selected: false
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },
  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#FF5A5F",
    alignSelf: "center",
    marginTop: -9
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 4,
    borderTopColor: "#D23F44",
    alignSelf: "center",
    marginTop: -0.5
  }
});

export { SpotMarker };
