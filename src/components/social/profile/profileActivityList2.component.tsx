import React from "react";
import { ImageSourcePropType, ListRenderItemInfo } from "react-native";
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles
} from "@kitten/theme";
import { List, ListItem } from "@kitten/ui";
import {
  ProfileActivityList2Item,
} from "./profileActivityList2Item.component";

const ProfileActivityList2Component = ({
  data,
  onPressDefault,
  ...rest
}) => {

  const onItemPress = (index: number) => {
    onPressDefault(index);
  };

  const hasOwnFunction = index => {
    return typeof data[index].onPress !== undefined
  }

  const renderItem = ({item}) => {
    console.log('info', item)
    return (
      <ListItem
        style={themedStyle.itemContainer}
        activeOpacity={0.75}
        onPress={item.onPress ? item.onPress : onItemPress}
      >
        <ProfileActivityList2Item style={themedStyle.item} source={item.image} />
      </ListItem>
    );
  }

  const { contentContainerStyle, themedStyle, ...restProps } = rest;

  return (
    <List
      data={data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      {...restProps}
      contentContainerStyle={[themedStyle.container, contentContainerStyle]}
      renderItem={renderItem}
    />
  );
};

export const ProfileActivityList2 = withStyles(
  ProfileActivityList2Component,
  (theme: ThemeType) => ({
    container: {},
    itemContainer: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginHorizontal: 8,
      border: "5px solid black",
      borderRadius: 8,
      overflow: "hidden"
    },
    item: {
      width: 120,
      height: 120
    }
  })
);
