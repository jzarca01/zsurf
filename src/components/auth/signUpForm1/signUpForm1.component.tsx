import React from "react";
import { Text, View, ViewProps } from "react-native";
import { ThemedComponentProps, ThemeType, withStyles } from "@kitten/theme";
import { CheckBox, Select } from "@kitten/ui";
import { textStyle, ValidationInput } from "@src/components/common";
import {
  EmailValidator,
  NameValidator,
  PasswordValidator
} from "@src/core/validators";
import { SignUpForm1Data } from "./type";

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignUpForm1Data | undefined) => void;
}

export type SignUpForm1Props = ThemedComponentProps &
  ViewProps &
  ComponentProps;

interface State {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  gender: {
    text: string
   } | undefined;
  password: string | undefined;
  termsAccepted: boolean;
}

class SignUpForm1Component extends React.Component<SignUpForm1Props, State> {
  public state: State = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    gender: undefined,
    password: undefined,
    termsAccepted: false
  };

  public componentDidUpdate(prevProps: SignUpForm1Props, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onFirstNameInputTextChange = (firstName: string) => {
    this.setState({ firstName });
  };

  private onLastNameValidationResult = (lastName: string) => {
    this.setState({ lastName });
  };

  private onEmailInputTextChange = (email: string) => {
    this.setState({ email });
  };

  private onPasswordInputTextChange = (password: string) => {
    this.setState({ password });
  };

  private onGenderChange = (gender: any) => {
    this.setState({ gender });
  };

  private onTermsAcceptChange = (termsAccepted: boolean) => {
    this.setState({ termsAccepted });
  };

  private isValid = (value: SignUpForm1Data): boolean => {
    const { firstName, lastName, email, gender, password, termsAccepted } = value;

    return (
      firstName !== undefined &&
      lastName !== undefined &&
      email !== undefined &&
      gender !== undefined &&
      password !== undefined &&
      termsAccepted
    );
  };

  private passwordCaption = (): string => {
    return this.state.password ? "" : "Password is empty or too short";
  };

  private data = [{ text: "Female" }, { text: "Male" }];

  public render(): React.ReactNode {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <ValidationInput
          style={[themedStyle.input, themedStyle.firstNameInput]}
          textStyle={themedStyle.inputText}
          placeholder="Kelly"
          label="FIRST NAME"
          autoCapitalize="words"
          validator={NameValidator}
          onChangeText={this.onFirstNameInputTextChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          placeholder="Slater"
          label="LAST NAME"
          autoCapitalize="words"
          validator={NameValidator}
          onChangeText={this.onLastNameValidationResult}
        />
        <Text style={[themedStyle.select, themedStyle.genderInput, textStyle.paragraph, textStyle.label]}>GENDER</Text>
        <Select
          style={themedStyle.select}
          data={this.data}
          placeholder=""
          selectedOption={this.state.gender}
          onSelect={this.onGenderChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={themedStyle.inputText}
          labelStyle={themedStyle.inputLabel}
          placeholder="kelly@slater.com"
          label="EMAIL"
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
        <ValidationInput
          style={themedStyle.input}
          textStyle={textStyle.paragraph}
          labelStyle={textStyle.label}
          captionTextStyle={textStyle.paragraph}
          label="PASSWORD"
          placeholder="Password"
          caption={this.passwordCaption()}
          secureTextEntry={true}
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
        <CheckBox
          style={themedStyle.termsCheckBox}
          textStyle={themedStyle.termsCheckBoxText}
          checked={this.state.termsAccepted}
          text={
            "By creating an account, I agree to the Terms of\nUse and Privacy Policy"
          }
          onChange={this.onTermsAcceptChange}
        />
      </View>
    );
  }
}

export const SignUpForm1 = withStyles(
  SignUpForm1Component,
  (theme: ThemeType) => ({
    container: {},
    input: {
      marginTop: 16
    },
    firstNameInput: {
      marginTop: 0
    },
    select: {
      flex: 1,
      marginVertical: 4,
    },
    termsCheckBox: {
      marginTop: 20
    },
    termsCheckBoxText: {
      fontSize: 11,
      color: theme["text-hint-color"],
      ...textStyle.paragraph
    },
    genderInput : {
      fontSize: 12,
      color: theme["text-hint-color"],
      marginTop:16
    }
  })
);
