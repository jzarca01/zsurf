import React from 'react';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ActivityBar,
  ActivityBarProps,
  textStyle,
} from '@src/components/common';

export type ProfileActivityBarProps = ThemedComponentProps & ActivityBarProps;

class ProfileActivityBarComponent extends React.Component<ProfileActivityBarProps> {

  public render(): React.ReactNode {
    const { themedStyle, children, ...restProps } = this.props;

    return (
      <ActivityBar {...restProps}>
        {children}
      </ActivityBar>
    );
  }
}

export const ProfileActivityBar = withStyles(ProfileActivityBarComponent, (theme: ThemeType) => ({

  likesLabel: {
    lineHeight: 0,
    marginHorizontal: 0,
    ...textStyle.paragraph,
  },
}));
