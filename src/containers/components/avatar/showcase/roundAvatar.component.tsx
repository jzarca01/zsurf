import React from 'react';
import {
  Avatar,
  AvatarProps,
} from '@kitten/ui';
import { imageProfile5 } from '@src/assets/images';

type AvatarElement = React.ReactElement<AvatarProps>;

export const RoundAvatar = (): AvatarElement => {
  return (
    <Avatar
      shape='round'
      source={imageProfile5.imageSource}
    />
  );
};
