import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { useDocument } from "react-firebase-hooks/firestore";
import useFirebaseUpload from "@src/core/config/useUpload";
import {
  getCurrentUserCollection,
  firebase
} from "@src/core/config/firebase.config";
import { ProfileSettings1 } from "./profileSettings1.component";

export const ProfileSettings1Container = ({ navigation, ...rest }) => {
  const [snapshot, loading, error] = useDocument(getCurrentUserCollection());

  const [profile, setProfile] = useState(null);

  const [
    { data, isLoading, isError, progress },
    setFileData
  ] = useFirebaseUpload();

  useEffect(() => {
    if (snapshot) {
      const data = snapshot.data();
      setProfile(data.profile);
    }
  }, [snapshot]);

  useEffect(() => {
    if (data) {
      updateProfile({
        ...profile,
        photo: data.downloadUrl
      });
    }
  }, [data]);

  const updateProfile = userDetails => {
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      userDocRef.update({
        profile: userDetails
      });
      navigation.goBack();
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: false,
      quality: 1
    });

    if (!result.cancelled) {
      return result.uri;
    }
    return null;
  };

  const onPhotoButtonPress = async () => {
    try {
      await getPermissionAsync();
      const imageUri = await pickImage();
      if (imageUri) {
        setFileData(imageUri);
      }
    } catch (err) {
      console.log("error with photo button", err);
    }
  };

  const onLogoutPress = () =>
    firebase
      .auth()
      .signOut()
      //.then(() =>firebase.auth().updateCurrentUser(null))
      .then(() => {
        navigation.navigate({
          routeName: "Sign In"
        });
      });

  return (
    profile && (
      <ProfileSettings1
        profile={profile}
        onPhotoButtonPress={onPhotoButtonPress}
        onButtonPress={updateProfile}
        onLogoutPress={onLogoutPress}
      />
    )
  );
};
