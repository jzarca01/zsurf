import React from "react";
import { ThemeType, withStyles } from "@kitten/theme";
import { Button } from "@kitten/ui";
import { textStyle } from "@src/components/common";

const HighlightTagComponent = ({ style, onPress, ...rest }) => {
  const { themedStyle } = rest;
  return (
    <Button
      textStyle={themedStyle.text}
      appearance="outline"
      size="tiny"
      {...rest}
      style={[themedStyle.container, style]}
      onPress={onPress}
    />
  );
};

export const HighlightTag = withStyles(
  HighlightTagComponent,
  (theme: ThemeType) => ({
    container: {
      borderWidth: 1,
      borderRadius: 15
    },
    text: {
      fontSize: 11,
      ...textStyle.paragraph
    }
  })
);
