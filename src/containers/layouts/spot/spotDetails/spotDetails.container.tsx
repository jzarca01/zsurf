import React, { useState, useEffect } from "react";
import {
  Text
} from 'react-native';
import { SpotDetails } from "./spotDetails.component";
import { Loader } from "@src/components/loader/loader.component";

const SpotDetailsContainer = ({ navigation }) => {
  const [spotId, setSpotId] = useState(null);
  const [spot, setSpot] = useState(null);

  const navigationKey = "SpotDetailsContainer";

  useEffect(() => {
    const id = navigation.getParam('spotId', null);
    setSpotId(id)
  }, []);

  useEffect(() => {
    const details = navigation.getParam('spot', null);
    setSpot(details)
  }, []);

  const onLogSessionPress = () => {
    navigation.navigate({
      key: this.navigationKey,
      routeName: "Log session",
      params: {
        spotId: spotId,
        spot: spot
      }
    });
  };

  const onPhotoPress = (index: number) => {};

  return (
    <React.Fragment>
    <Loader visible={!spot} />
    {spot && <SpotDetails
      spot={spot}
      onLogSessionPress={onLogSessionPress}
      onPhotoPress={onPhotoPress}
    />}
    </React.Fragment>
  );
};

export { SpotDetailsContainer };
