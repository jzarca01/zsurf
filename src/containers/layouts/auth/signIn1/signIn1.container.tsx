import React, { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignInForm1Data } from "@src/components/auth";

import { SignIn1 } from "./signIn1.component";

import * as firebase from 'firebase'

const SignIn1Container = ({ navigation }) => {
  const navigationKey = "Sign In";

  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if(user) {
    navigation.navigate({
      routeName: "Logged In",
      key: navigationKey
    });
  }
  }, [user])

  const onSignInPress = (formData: SignInForm1Data) => {
    const { email, password } = formData
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const onSignUpPress = () => {
    navigation.navigate({
      routeName: "Sign Up",
      key: navigationKey
    });
  };

  const onForgotPasswordPress = () => {
    navigation.navigate({
      routeName: "Forgot Password",
      key: navigationKey
    });
  };
  return (
    <SignIn1
      loading={loading}
      onSignInPress={onSignInPress}
      onSignUpPress={onSignUpPress}
      onForgotPasswordPress={onForgotPasswordPress}
    />
  );
};

export { SignIn1Container };
