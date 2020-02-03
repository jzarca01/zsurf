import React, { useState, useEffect } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { Loader } from "@src/components/loader/loader.component";
import { EditSurfboard } from "./editSurfboard.component";
import { showToast } from "@src/components/common/toast.component";
import {
  firebase,
  getCurrentUserCollection
} from "@src/core/config/firebase.config";

export const EditSurfboardContainer = ({ navigation, ...rest }) => {
  const navigationKey = "EditSurfboardContainer";
  const [snapshot, loading, error] = useDocumentOnce(
    getCurrentUserCollection()
  );

  const [shouldLoaderBeVisible, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isEdit, setEdit] = useState(false);

  const [dbSurfboards, setDbSurfboards] = useState(null);

  const [surfboard, setSurfboard] = useState({
    id: null,
    name: null,
    type: null,
    isDefault: false
  });
  const [tempCopy, setTempCopy] = useState(null);

  useEffect(() => {
    if (snapshot) {
      const data = snapshot.data();
      setDbSurfboards(data.surfboards);
    }
  }, [snapshot]);

  useEffect(() => {
    const existingSurfboard = navigation.getParam("surfboard", null);
    if (existingSurfboard) {
      setSurfboard({ ...surfboard, ...existingSurfboard });
      setTempCopy(existingSurfboard);
      setEdit(true);
    }
  }, [navigation]);

  useEffect(() => {
    console.log("errormessage", errorMessage);
    if (typeof errorMessage !== undefined && errorMessage) {
      showToast(errorMessage);
      return () => setErrorMessage(null);
    }
  }, [errorMessage]);

  const addSurfboard = surfboard => {
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      if (surfboard.isDefault) {
        userDocRef.update({
          surfboards: setDefaultToFalse()
        });
      }
      userDocRef.update({
        surfboards: firebase.firestore.FieldValue.arrayUnion({
          ...surfboard,
          id: dbSurfboards.length + 1
        })
      });
    }
  };

  const editSurfboard = surfboard => {
    const oldSurfboardIndex = dbSurfboards.findIndex(
      surf => surf.id === tempCopy.id
    );
    const editedArray = [
      ...dbSurfboards.slice(0, oldSurfboardIndex),
      surfboard,
      ...dbSurfboards.slice(oldSurfboardIndex + 1)
    ];
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      if (surfboard.isDefault) {
        userDocRef.update({
          surfboards: setDefaultToFalse()
        });
      }
      userDocRef.update({
        surfboards: editedArray
      });
    }
  };

  const deleteSurfboard = surfboard => {
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      userDocRef.update({
        surfboards: firebase.firestore.FieldValue.arrayRemove(surfboard)
      });
      if (surfboard.isDefault) {
        const otherSurfboards = dbSurfboards.filter(
          surf => surf.id !== surfboard.id
        );
        const editedArray = [
          { ...otherSurfboards[0], isDefault: true },
          ...otherSurfboards.slice(1)
        ];
        userDocRef.update({
          surfboards: editedArray
        });
      }
    }
  };

  const setDefaultToFalse = () => {
    return dbSurfboards.map(surf => ({ ...surf, isDefault: false }));
  };

  const onSaveButtonPress = () => {
    setLoader(true);
    if (isEdit) {
      editSurfboard(surfboard);
    } else {
      addSurfboard(surfboard);
    }
    setLoader(false);
    navigation.navigate({
      key: navigationKey,
      routeName: "Profile"
    });
  };

  const onDeleteButtonPress = () => {
    setLoader(true);
    deleteSurfboard(surfboard);
    setLoader(false);
    navigation.navigate({
      key: navigationKey,
      routeName: "Profile"
    });
  };

  const hasTwoOrMoreSurfboards = dbSurfboards && dbSurfboards.length > 1;

  return (
    <React.Fragment>
      <Loader visible={!dbSurfboards || shouldLoaderBeVisible} />
      {!shouldLoaderBeVisible && dbSurfboards && (
        <EditSurfboard
          surfboard={surfboard}
          setSurfboard={setSurfboard}
          canDeleteSurfboard={isEdit && hasTwoOrMoreSurfboards}
          canToggleDefault={!isEdit || hasTwoOrMoreSurfboards}
          onDeleteButtonPress={onDeleteButtonPress}
          onSaveButtonPress={onSaveButtonPress}
        />
      )}
    </React.Fragment>
  );
};
