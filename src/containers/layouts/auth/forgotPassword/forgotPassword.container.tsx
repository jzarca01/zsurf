import React from "react";
import { ForgotPasswordFormData } from "@src/components/auth";
import { ForgotPassword } from "./forgotPassword.component";
import { firebase } from "@src/core/config/firebase.config";

export const ForgotPasswordContainer = props => {
  const navigationKey = "Forgot Password";

  const { navigation } = props;

  const onResetPress = (data: ForgotPasswordFormData) => {
    firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .then(() => navigation.goBack());
  };

  const onSignInPress = () => {
    navigation.navigate({
      key: navigationKey,
      routeName: "Sign In"
    });
  };

  return (
    <ForgotPassword onResetPress={onResetPress} onSignInPress={onSignInPress} />
  );
};
