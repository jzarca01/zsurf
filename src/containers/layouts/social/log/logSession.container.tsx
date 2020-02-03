import React, { useState, useEffect } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { Loader } from "@src/components/loader/loader.component";
import { LogSession } from "./logSession.component";
import { showToast } from "@src/components/common/toast.component";
import {
  firebase,
  getCurrentUserCollection
} from "@src/core/config/firebase.config";
import moment from "moment";

import msw from "node-msw";

export const LogSessionContainer = ({ navigation, ...rest }) => {
  const navigationKey = "LogSessionContainer";

  const [snapshot, loading, error] = useDocumentOnce(
    getCurrentUserCollection()
  );

  const [userSurfboards, setUserSurfboards] = useState(null);

  const [shouldLoaderBeVisible, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [canSave, setSave] = useState(false);

  useEffect(() => {
    if (snapshot) {
      const data = snapshot.data();
      setUserSurfboards(data.surfboards);
      setReport({
        ...report,
        surfboardUsed: data.surfboards.find(surf => surf.isDefault)
      });
    }
  }, [snapshot]);

  const roundDate = (date, duration) => {
    const remainder = moment(date).minutes() % duration;
    const roundedDate = moment(date).subtract(remainder, "minutes");
    return roundedDate;
  };

  const toUnix = date => {
    const roundedDate = roundDate(date, 10);
    const ts = Math.floor(moment.utc(roundedDate).valueOf() / 1000);
    return ts;
  };

  const [spot, setSpot] = useState(null);
  const [report, setReport] = useState({
    notes: null,
    rating: null,
    startTime: null,
    endTime: null,
    msw: null,
    name: null,
    surfboardUsed: null
  });

  useEffect(() => {
    setSave(
      report.startTime && report.endTime && isMoreThanTwenty() && report.rating
    );
  }, [report]);

  const isMoreThanTwenty = () => {
    if (report.startTime && report.endTime) {
      const endDate = moment(report.endTime);
      const startDate = moment(report.startTime);
      return endDate.diff(startDate, "minutes") >= 20;
    }
    return false;
  };

  useEffect(() => {
    const spotDetails = navigation.getParam("spot", null);
    setSpot(spotDetails);
  }, []);

  useEffect(() => {
    console.log("errormessage", errorMessage);
    if (typeof errorMessage !== undefined && errorMessage) {
      showToast(errorMessage);
      return () => setErrorMessage(null);
    }
  }, [errorMessage]);

  const getSpotIdFromUrl = spotUrl => {
    const spotId = spotUrl.match(/\d/g);
    return spotId.join("");
  };

  const getMswInfos = (spotId, startTime, endTime) => {
    return msw
      .getForecastBySpot(spotId, toUnix(startTime), toUnix(endTime))
      .catch(err => console.log("error with msw infos", err));
  };

  const addSession = session => {
    const userDocRef = getCurrentUserCollection();
    if (userDocRef) {
      userDocRef.update({
        sessions: firebase.firestore.FieldValue.arrayUnion(session)
      });
    }
  };

  const onSaveButtonPress = () => {
    setLoader(true);
    const { startTime, endTime } = report;
    const { name, surf_report_link } = spot;
    const mswId = getSpotIdFromUrl(surf_report_link);
    if (mswId) {
      getMswInfos(mswId, startTime, endTime)
        .then(data =>
          addSession({
            ...report,
            name: name,
            msw: data[0]
          })
        )
        .then(() => {
          setLoader(false);
          navigation.navigate({
            key: navigationKey,
            routeName: "Profile"
          });
        })
        .catch(err => {
          setLoader(false);
          console.log(err);
        });
    }
  };

  const maxDate = roundDate(moment(), 10);
  const minDate = roundDate(moment().subtract(1, "day"), 10);

  return (
    <React.Fragment>
      <Loader visible={!spot || !userSurfboards || shouldLoaderBeVisible} />
      {spot && userSurfboards && (
        <LogSession
          spot={spot}
          report={report}
          minDate={minDate.toDate()}
          maxDate={maxDate.toDate()}
          setReport={setReport}
          canSave={canSave}
          onSaveButtonPress={onSaveButtonPress}
          userSurfboards={userSurfboards}
        />
      )}
    </React.Fragment>
  );
};
