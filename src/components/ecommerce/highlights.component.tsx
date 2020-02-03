import React from "react";
import { View } from "react-native";
import { withStyles, ThemeType } from "@kitten/theme";
import { HighlightTag } from "./highlightTag.component";

interface ComponentProps {
  data: string[];
  onItemPress: (index: number) => void;
}

const HighlightTagsComponent = ({ data, onItemPress, ...rest }) => {
  const { style, themedStyle, restProps } = rest;

  const renderListItemElement = item => {
    return (
      <HighlightTag
        style={themedStyle.item}
        onPress={onItemPress}
      >
        {item}
      </HighlightTag>
    );
  };

  const renderItem = (item, index) => {
    const listItemElement = renderListItemElement(item);
    return React.cloneElement(listItemElement, { index, key: index });
  };

  return (
    <View {...restProps} style={[themedStyle.container, style]}>
      {data.map(renderItem)}
    </View>
  );
};

export const HighlightTags = withStyles(
  HighlightTagsComponent,
  (theme: ThemeType) => ({
    container: {
      flexDirection: "row",
      flexWrap: "wrap"
    },
    item: {
      marginVertical: 2,
      marginRight: 8
    }
  })
);
