import React from 'react';
import {
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Input, Text } from '@kitten/ui';
import { textStyle } from '@src/components/common';

interface ComponentProps {
  hint?: string;
  value: string;
}

export type ProfileSettingProps = ComponentProps & ViewProps & ThemedComponentProps;

class ProfileSettingComponent extends React.Component<ProfileSettingProps> {
  private renderTextElement = (text: string, style: StyleProp<TextStyle>, onChange: Function = undefined): React.ReactElement<TextProps> => {
    return (onChange ? 
      <Input
        style={style}
        placeholder='Place your Text'
        value={text}
        onChangeText={onChange}
      /> :
      <Text
        style={style}
        appearance='hint'>
        {text}
      </Text>
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, hint, value, onChange, children, ...restProps } = this.props;
    const { container, hintLabel, valueLabel } = themedStyle;

    return (
      <View
        {...restProps}
        style={[container, style.container]}>
        {hint ? this.renderTextElement(hint, [hintLabel, style.hintLabel]) : null}
        {!children && this.renderTextElement(value, [valueLabel, style.valueLabel], onChange)}
        {children}
      </View>
    );
  }
}

export const ProfileSetting = withStyles(ProfileSettingComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  hintLabel: textStyle.caption2,
  valueLabel: {
    color: theme['text-basic-color'],
    ...textStyle.caption2,
  },
  input: {
    border: 'none'
  }
}));
