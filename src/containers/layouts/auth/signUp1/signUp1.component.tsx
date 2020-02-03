import React, { useState} from 'react';
import {
  ImageProps,
  View,
} from 'react-native';
import {
  StyleType,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
import {
  SignUpForm1,
  SignUpForm1Data,
} from '@src/components/auth';
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle,
} from '@src/components/common';
import {
  ArrowForwardIconOutline,
} from '@src/assets/icons';
import {
  imageSignUp1Bg,
  ImageSource,
} from '@src/assets/images';

const SignUp1Component = ({onSignUpPress, onSignInPress, loading, ...rest}) => {
  const [ formData, setFormData ] = useState(null);

  const { themedStyle } = rest;

  const backgroundImage: ImageSource = imageSignUp1Bg;

  const onFormDataChange = (formData: SignUpForm1Data) => {
    setFormData(formData);
  };

  const onSignUpButtonPress = () => {
    onSignUpPress(formData);
  };

  const renderSignInButtonIcon = (style: StyleType): React.ReactElement<ImageProps> => {

    return ArrowForwardIconOutline({ ...style, ...themedStyle.signInButtonIcon });
  };

    return (
      <ScrollableAvoidKeyboard style={themedStyle.container}>
        <ImageOverlay
          style={themedStyle.headerContainer}
          source={backgroundImage.imageSource}>
          <View style={themedStyle.signUpContainer}>
            <Text
              style={themedStyle.signInLabel}
              category='h4'>
              SIGN UP
            </Text>
            <Button
              style={themedStyle.signInButton}
              textStyle={themedStyle.signInButtonText}
              appearance='ghost'
              size='giant'
              activeOpacity={0.75}
              icon={renderSignInButtonIcon}
              onPress={onSignInPress}>
              Sign In
            </Button>
          </View>
        </ImageOverlay>
        <SignUpForm1
          style={themedStyle.formContainer}
          onDataChange={onFormDataChange}
        />
        <Button
          style={themedStyle.signUpButton}
          textStyle={textStyle.button}
          size='large'
          disabled={!formData || loading}
          onPress={onSignUpButtonPress}>
          SIGN UP
        </Button>
      </ScrollableAvoidKeyboard>
    );
  }

export const SignUp1 = withStyles(SignUp1Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
  },
  headerContainer: {
    minHeight: 200,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  signInLabel: {
    flex: 1,
    color: 'white',
    ...textStyle.headline,
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signInButtonText: {
    color: 'white',
    ...textStyle.button,
  },
  signInButtonIcon: {
    marginHorizontal: 0,
    tintColor: 'white',
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  }
}));

