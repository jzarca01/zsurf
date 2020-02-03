import React, { useState, useEffect } from "react";

import { firebase, getCurrentUserCollection } from "@src/core/config/firebase.config";

import { useAuthState } from "react-firebase-hooks/auth";

import { SignUpForm1Data } from "@src/components/auth";
import { SignUp1 } from "./signUp1.component";

const SignUp1Container = ({ navigation }) => {
  const navigationKey: string = "Sign Up";
  const [updated, setUpdated] = useState(false);

  const [user, loading, error] = useAuthState(firebase.auth());

  let userDocRef;

  const setUserDetailsInFirestore = async userDetails => {
    userDocRef = await getCurrentUserCollection();
    return userDocRef.set({
      profile: userDetails,
      surfboards: [{
        id: 0,
        name: "Default surfboard",
        isDefault: true
      }],
      sessions: [],
      lastLocation: null
    });
  };

  useEffect(() => {
    if (updated && user) {
      navigation.navigate({
        key: navigationKey,
        routeName: "Logged In"
      });
    }
  }, [updated]);

  const onSignUpPress = async (formData: SignUpForm1Data) => {
    const { email, password } = formData;
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await updateProfile(formData);
    setUpdated(true);
  };

  const updateProfile = (formData: SignUpForm1Data) => {
    if (formData) {
      const { email, firstName, gender, lastName } = formData
      return setUserDetailsInFirestore({email, firstName, lastName, gender: gender.text});
    }
  };

  const onSignInPress = () => {
    navigation.navigate({
      key: navigationKey,
      routeName: "Sign In"
    });
  };

  return (
    <SignUp1
      loading={loading}
      onSignUpPress={onSignUpPress}
      onSignInPress={onSignInPress}
    />
  );
};

export { SignUp1Container };
