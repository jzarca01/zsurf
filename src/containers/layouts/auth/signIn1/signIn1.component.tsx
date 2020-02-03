import React, { useState } from "react";
import { ImageBackground, View } from "react-native";
import { ThemedComponentProps, ThemeType, withStyles } from "@kitten/theme";
import { Button, Text } from "@kitten/ui";
import { SignInForm1, SignInForm1Data } from "@src/components/auth";
import { ScrollableAvoidKeyboard, textStyle } from "@src/components/common";
import { ArrowForwardIconOutline } from "@src/assets/icons";
import { imageSignIn1Bg } from "@src/assets/images";
import { TouchableHighlight } from "react-native-gesture-handler";

interface ComponentProps {
  onSignInPress: (formData) => void;
  onSignUpPress: () => void;
  onForgotPasswordPress: () => void;
}

export type SignIn1Props = ThemedComponentProps & ComponentProps;

const SignIn1Component = ({
  loading,
  onSignInPress,
  onSignUpPress,
  onForgotPasswordPress,
  ...rest
}) => {
  const [formData, setFormData] = useState(undefined);
  const backgroundImage = imageSignIn1Bg;

  const onFormDataChange = (formData: SignInForm1Data) => {
    setFormData(formData);
  };

  const renderSignUpButtonIcon = style =>
    ArrowForwardIconOutline({ ...style, ...themedStyle.signUpButtonIcon });

  const { themedStyle } = rest;
  return (
    <ScrollableAvoidKeyboard>
      <ImageBackground
        style={themedStyle.container}
        source={backgroundImage.imageSource}
      >
        <View style={themedStyle.signInContainer}>
          <Text style={themedStyle.signInLabel} category="h4">
            SIGN IN
          </Text>
          <Button
            style={themedStyle.signUpButton}
            textStyle={themedStyle.signUpButtonText}
            activeOpacity={0.75}
            appearance="ghost"
            size="giant"
            icon={renderSignUpButtonIcon}
            onPress={() => onSignUpPress(formData)}
          >
            Sign Up
          </Button>
        </View>
        <SignInForm1
          style={themedStyle.formContainer}
          onDataChange={onFormDataChange}
        />
        <Button
          size="large"
          textStyle={textStyle.button}
          disabled={!formData || loading}
          onPress={() => onSignInPress(formData)}
        >
          SIGN IN
        </Button>
        <TouchableHighlight onPress={onForgotPasswordPress}>
          <Text style={themedStyle.forgotPasswordText}>
            Forgot your password ?
          </Text>
        </TouchableHighlight>
      </ImageBackground>
    </ScrollableAvoidKeyboard>
  );
};

export const SignIn1 = withStyles(SignIn1Component, (theme: ThemeType) => ({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24
  },
  socialAuthContainer: {
    marginTop: 48
  },
  ewaButton: {
    maxWidth: 72,
    paddingHorizontal: 0
  },
  ewaButtonText: {
    color: "white",
    ...textStyle.button
  },
  ewaButtonIcon: {
    marginHorizontal: 0,
    tintColor: "white"
  },
  formContainer: {
    flex: 1,
    marginTop: 48
  },
  signInLabel: {
    flex: 1,
    ...textStyle.headline,
    color: "white",
    marginBottom: 48
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0
  },
  signUpButtonText: {
    color: "white"
  },
  signUpButtonIcon: {
    marginHorizontal: 0,
    tintColor: "white"
  },
  forgotPasswordText: {
    color: "white"
  }
}));
