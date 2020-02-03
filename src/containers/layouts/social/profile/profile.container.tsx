import React, { useState, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { getCurrentUserCollection } from "@src/core/config/firebase.config";

import { Profile } from "./profile.component";
import { Loader } from "@src/components/loader/loader.component";

const ProfileContainer = ({ navigation, ...rest }) => {
  const [snapshot, loading, error] = useDocument(getCurrentUserCollection());
  const [state, setState] = useState({
    profile: null,
    surfboards: [],
    lastLocation: null,
    sessions: []
  });

  useEffect(() => {
    if (snapshot) {
      const data = snapshot.data();
      setState({
        ...state,
        ...data
      });
    }
  }, [snapshot]);

  const navigationKey = "ProfileContainer";

  const onLogSessionPress = () =>
    navigation.navigate({
      key: navigationKey,
      routeName: "Map",
      params: {
        logSessionTip: true
      }
    });

  const onSettingsPress = () =>
    navigation.navigate({
      key: navigationKey,
      routeName: "Profile Settings"
    });

  const onAddSurfboardPress = () =>
    navigation.navigate({
      key: navigationKey,
      routeName: "Add surfboard"
    });

  const onSurfboardPress = index => {
    navigation.navigate({
      key: navigationKey,
      routeName: "Edit surfboard",
      params: {
        surfboard: state.surfboards[index]
      }
    });
  };

  const onSessionPress = session => {
    navigation.navigate({
      key: navigationKey,
      routeName: "Session",
      params: {
        session: session
      }
    });
  };

  const [isTooltipVisible, setTooltipVisible] = useState(false)

  return (
    <React.Fragment>
      <Loader visible={loading} />
      {state.profile && (
        <Profile
          profile={state.profile}
          location={state.lastLocation}
          surfboards={state.surfboards}
          sessions={state.sessions}
          onLogSessionPress={onLogSessionPress}
          onSessionPress={onSessionPress}
          onSurfboardPress={onSurfboardPress}
          onSettingsPress={onSettingsPress}
          onAddSurfboardPress={onAddSurfboardPress}
          isTooltipVisible={isTooltipVisible}
          setTooltipVisible={setTooltipVisible}
          {...rest}
        />
      )}
    </React.Fragment>
  );
};

export { ProfileContainer };
