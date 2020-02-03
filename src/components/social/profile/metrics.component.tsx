import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemeType, withStyles } from "@kitten/theme";
import { Text } from "@kitten/ui";
import { textStyle } from "@src/components/common";

const MetricsComponent = ({
  sessions,
  duration,
  onSessionPress,
  onDurationPress,
  ...rest
}) => {
  const {
    style,
    themedStyle,
    textStyle: derivedTextStyle,
    ...restProps
  } = rest;

  return (
    <View {...restProps} style={[themedStyle.container, style]}>
      <TouchableOpacity
        activeOpacity={0.65}
        style={themedStyle.parameterContainer}
        onPress={onSessionPress}
      >
        <Text
          style={[themedStyle.valueLabel, derivedTextStyle]}
        >{`${sessions}`}</Text>
        <Text
          style={[themedStyle.hintLabel, derivedTextStyle]}
          appearance="hint"
          category="s2"
        >
          Sessions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.65}
        style={themedStyle.parameterContainer}
        onPress={onDurationPress}
      >
        <Text
          style={[themedStyle.valueLabel, derivedTextStyle]}
        >{`${duration}`} minutes</Text>
        <Text
          style={[themedStyle.hintLabel, derivedTextStyle]}
          appearance="hint"
          category="s2"
        >
          Duration
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const Metrics = withStyles(MetricsComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  parameterContainer: {
    alignItems: "center"
  },
  valueLabel: textStyle.caption2,
  hintLabel: textStyle.subtitle
}));
