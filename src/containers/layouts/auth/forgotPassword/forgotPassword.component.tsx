import React from "react";
import { ImageProps, View, TouchableHighlight } from "react-native";
import {
  StyleType,
  ThemedComponentProps,
  ThemeType,
  withStyles
} from "@kitten/theme";
import { Button, Text } from "@kitten/ui";
import {
  ForgotPasswordForm,
  ForgotPasswordFormData
} from "@src/components/auth";
import {
  ScrollableAvoidKeyboard,
  ImageOverlay,
  textStyle
} from "@src/components/common";
import { imageForgotPasswordBg, ImageSource } from "@src/assets/images";
import { ArrowForwardIconOutline } from "@src/assets/icons";

interface ComponentProps {
  onResetPress: (formData: ForgotPasswordFormData) => void;
  onSignInPress: () => void;
}

export type ForgotPasswordProps = ThemedComponentProps & ComponentProps;

interface State {
  formData: ForgotPasswordFormData | undefined;
}

class ForgotPasswordComponent extends React.Component<
  ForgotPasswordProps,
  State
> {
  public state: State = {
    formData: undefined
  };

  private backgroundImage: ImageSource = imageForgotPasswordBg;

  private onFormDataChange = (formData: ForgotPasswordFormData) => {
    this.setState({ formData });
  };

  private onResetPasswordButtonPress = () => {
    this.props.onResetPress(this.state.formData);
  };

  private onSignInButtonPress = () => {
    this.props.onSignInPress();
  };

  public render(): React.ReactNode {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboard>
        <ImageOverlay
          style={themedStyle.container}
          source={this.backgroundImage.imageSource}
        >
          <View style={themedStyle.forgotContainer}>
            <Text style={themedStyle.forgotPasswordLabel} category="h4">
              FORGOT YOUR PASSWORD
            </Text>
          </View>
          <Text style={themedStyle.enterEmailLabel} appearance="alternative">
            Please enter your email address
          </Text>
          <ForgotPasswordForm
            style={themedStyle.formContainer}
            onDataChange={this.onFormDataChange}
          />
          <Button
            style={themedStyle.resetButton}
            textStyle={textStyle.button}
            size="giant"
            disabled={!this.state.formData}
            onPress={this.onResetPasswordButtonPress}
          >
            RESET PASSWORD
          </Button>
          <TouchableHighlight onPress={this.onSignInButtonPress}>
            <Text style={themedStyle.signInText}>Remember your password ?</Text>
          </TouchableHighlight>
        </ImageOverlay>
      </ScrollableAvoidKeyboard>
    );
  }
}

export const ForgotPassword = withStyles(
  ForgotPasswordComponent,
  (theme: ThemeType) => ({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 24
    },
    forgotContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 32
    },
    formContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: 24
    },
    forgotPasswordLabel: {
      alignSelf: "center",
      marginTop: 24,
      color: "white",
      ...textStyle.headline
    },
    enterEmailLabel: {
      alignSelf: "center",
      marginTop: 64,
      color: "white",
      ...textStyle.subtitle
    },
    resetButton: {},
    signInText: {
      color: "white"
    }
  })
);
