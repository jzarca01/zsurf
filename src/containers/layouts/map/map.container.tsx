import React, { useState, useEffect } from "react";
import {
  Platform,
  Dimensions,
  Linking,
  NativeModules,
  Alert
} from "react-native";
const { RNAndroidOpenSettings } = NativeModules;

import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { reverse } from "revgeo";

import { getCurrentUserCollection } from "@src/core/config/firebase.config";
import { Map } from "./map.component";
import { Loader } from "@src/components/loader/loader.component";
import { Error } from "../../../components/error/error.component";

import { getNESWBoundsFromRadiusAndCenter as getBounds } from "./utils";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapContainer = ({ navigation }) => {
  const navigationKey = "Map";

  const [isLocationFound, setLocationFound] = useState(false);
  const [position, setPosition] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [region, setRegion] = useState({
    latitude: 47,
    longitude: 5,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  const [index, setIndex] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [shouldLoaderBeVisible, setLoader] = useState(false);

  useEffect(() => {
    const shouldOpenPopup = navigation.getParam("logSessionTip", false);
    if (shouldOpenPopup) {
      Alert.alert("To log a session, go to a surf spot details");
    }
  }, [navigation]);

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMessage(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      getLocationAsync();
      startWatch();
    }
    return () => clearWatch();
  }, []);

  useEffect(() => {
    onRegionChange(markers[index], index);
  }, [index]);

  useEffect(() => {
    if (position) {
      setBounds(getBounds(50000, position));
    }
  }, [position]);

  useEffect(() => {
    if (position) {
      setErrorMessage(null)
      reverse(position)
        .then(results => {
          const { country } = results;
          if (country) {
            setUserLocationInFirestore({ lastLocation: country });
          }
        })
        .catch(err => setErrorMessage(err));
    }
  }, [position]);

  const setUserLocationInFirestore = userDetails => {
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      userDocRef.update(userDetails);
    }
  };

  useEffect(() => {
    if (bounds) {
      setLoader(true);
      axios({
        method: "GET",
        url: "https://www.surftriplist.com/surf_spots/within_bounds",
        params: {
          sw_corner: `${bounds.sw["lat"]},${bounds.sw["lng"]}`,
          ne_corner: `${bounds.ne["lat"]},${bounds.ne["lng"]}`
        }
      })
        .then(markers => {
          const dataPlusMarkers = [
            {
              id: 0,
              name: "Your position",
              isPosition: true,
              description: `There are ${markers.data.length} spots around you`,
              ...position
            },
            ...markers.data
          ];
          setLoader(false);
          return setMarkers(dataPlusMarkers);
        })
        .catch(err => {
          console.log(err);
          setLoader(false);
        });
    }
  }, [bounds]);

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('status', status)
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    }
    let position = await Location.getCurrentPositionAsync({
      accuracy: 6, // Accuracy.BestForNavigation
      maximumAge: 60 * 60 * 1000 // one hour in ms
    });
    await getCurrentLocation(position);
  };

  const startWatch = async () => {
    this.watchID = await Location.watchPositionAsync(
      {
        accuracy: 6, // Accuracy.BestForNavigation
        distanceInterval: 10 * 1000 // in meters
      },
      async position => await getCurrentLocation(position)
    );
  };

  const clearWatch = () => {
    this.watchID != null && this.watchID.remove();
  };

  const getCurrentLocation = async position => {
    try {
      setErrorMessage(null)
      const { coords } = position;
      setRegion({
        ...region,
        ...coords
      });
      setLocationFound(true);
      setPosition(coords);
    } catch (err) {
      setLoader(false);
      setErrorMessage(err);
    }
  };

  const onRegionChange = (newRegion, index) => {
    if (index) {
      // if comes from press on marker
      let formattedRegion = {
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      setRegion(formattedRegion);
      //setIndex(index);
    }
  };

  const goToSpot = (spotId, spot) => {
    navigation.navigate({
      key: navigationKey,
      routeName: "Spot Details",
      params: {
        spotId: spotId,
        spot: spot
      }
    });
  };

  return (
    <React.Fragment>
      <Loader visible={shouldLoaderBeVisible} />
      {errorMessage && <Error errorMessage={errorMessage} onRetryPress={getLocationAsync} />}
      {isLocationFound && (
        <Map
          region={region}
          onRegionChange={onRegionChange}
          goToSpot={goToSpot}
          position={position}
          markers={markers}
          index={index}
          onIndexChange={setIndex}
        />
      )}
    </React.Fragment>
  );
};

export { MapContainer };
