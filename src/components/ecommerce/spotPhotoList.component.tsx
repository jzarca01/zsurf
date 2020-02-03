import React from "react";
import { ListRenderItemInfo } from "react-native";
import { withStyles, ThemeType } from "@kitten/theme";
import { List, ListProps } from "@kitten/ui";
import { ImageSource } from "@src/assets/images";
import { SpotPhoto } from "@src/components/ecommerce/spotPhoto.component";

// @ts-ignore (override `renderItem` prop)
interface ComponentProps extends ListProps {
  renderItem?: () => void;
  onItemPress: (index: number) => void;
  data: ImageSource[];
}

const SpotPhotoListComponent = ({ data, onItemPress, ...rest }) => {
  const { contentContainerStyle, themedStyle } = rest;

  const renderListItemElement = item => (
    <SpotPhoto
      style={themedStyle.item}
      activeOpacity={0.75}
      source={{ uri: item.image_url }}
      onPress={onItemPress}
    />
  );

  const renderItem = (info: ListRenderItemInfo<ImageSource>) => {
    const { item, index } = info;
    const listItemElement = renderListItemElement(item);
    return React.cloneElement(listItemElement, { index });
  };

  return (
    <List
      data={data}
      showsHorizontalScrollIndicator={false}
      {...rest}
      contentContainerStyle={[themedStyle.container, contentContainerStyle]}
      horizontal={true}
      renderItem={renderItem}
    />
  );
};

export const SpotPhotoList = withStyles(
  SpotPhotoListComponent,
  (theme: ThemeType) => ({
    container: {},
    item: {
      width: 180,
      height: 120,
      marginHorizontal: 8,
      backgroundColor: theme["background-basic-color-2"]
    }
  })
);
