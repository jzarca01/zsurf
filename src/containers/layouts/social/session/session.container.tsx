import React, { useState, useEffect } from "react";
import { Session } from "./session.component";
import { Loader } from "@src/components/loader/loader.component";

const SessionContainer = ({ navigation }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const details = navigation.getParam("session", null);
    setSession(details);
  }, []);

  return (
    <React.Fragment>
      <Loader visible={!session} />
      {session && <Session session={session} />}
    </React.Fragment>
  );
};

export { SessionContainer };
