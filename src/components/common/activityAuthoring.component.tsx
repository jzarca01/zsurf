import React from 'react';
import {
  ImageSourcePropType,
  View,
  ViewProps,
} from 'react-native';
import { Text } from '@kitten/ui';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { textStyle } from '@src/components/common/style';

interface ComponentProps {
  name: string;
  date: string;
  duration: string;
}

export type ActivitiAuthoringProps = ThemedComponentProps & ViewProps & ComponentProps;

class ActivityAuthoringComponent extends React.Component<ActivitiAuthoringProps> {

  public render(): React.ReactNode {
    const { style, themedStyle, name, date, duration, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        <View style={themedStyle.authorInfoContainer}>
          <Text style={themedStyle.authorNameLabel}>{name}</Text>
          <Text
            style={themedStyle.dateLabel}
            appearance='hint'
            category='p2'>
            You surfed on {date} for {duration}
          </Text>
        </View>
      </View>
    );
  }
}

export const ActivityAuthoring = withStyles(ActivityAuthoringComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorInfoContainer: {
    marginLeft: 16,
  },
  authorNameLabel: textStyle.subtitle,
  dateLabel: textStyle.paragraph,
}));
