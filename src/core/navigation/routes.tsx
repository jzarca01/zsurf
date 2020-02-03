import React from "react";
import { enableScreens } from "react-native-screens";
import {
  createAppContainer,
  NavigationContainer,
  NavigationRouteConfigMap
} from "react-navigation";
import {
  createStackNavigator,
  NavigationStackProp
} from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MenuContainer } from "@src/containers/menu";

import {
  ForgotPasswordContainer,
  SignIn1Container,
  SignUp1Container
} from "@src/containers/layouts/auth";
import { SpotDetailsContainer } from "@src/containers/layouts/spot";
import { EditSurfboardContainer } from "@src/containers/layouts/social";
import { MapContainer } from "@src/containers/layouts/map";
import {
  ProfileContainer,
  ProfileSettings1Container,
  LogSessionContainer,
  SessionContainer
} from "@src/containers/layouts/social";

import {
  EcommerceNavigationOptions,
  ToplessMenuNavigationOptions,
  SocialNavigationOptions
} from "./options";

const SpotDetailsNavigationMap: NavigationRouteConfigMap<
  any,
  NavigationStackProp
> = {
  ["Spot Details"]: {
    screen: SpotDetailsContainer,
    navigationOptions: EcommerceNavigationOptions
  }
};

const SocialNavigationMap: NavigationRouteConfigMap<
  any,
  NavigationStackProp
> = {
  ["Profile"]: {
    screen: ProfileContainer,
    navigationOptions: SocialNavigationOptions
  },
  ["Profile Settings"]: {
    screen: ProfileSettings1Container,
    navigationOptions: EcommerceNavigationOptions
  },
  ["Log session"]: {
    screen: LogSessionContainer,
    navigationOptions: EcommerceNavigationOptions
  },
  ["Session"]: {
    screen: SessionContainer,
    navigationOptions: EcommerceNavigationOptions
  },
  ["Add surfboard"]: {
    screen: EditSurfboardContainer,
    navigationOptions: EcommerceNavigationOptions
  },
  ["Edit surfboard"]: {
    screen: EditSurfboardContainer,
    navigationOptions: EcommerceNavigationOptions
  }
};

const AuthNavigationMap: NavigationRouteConfigMap<any, NavigationStackProp> = {
  ["Sign In"]: SignIn1Container,
  ["Sign Up"]: SignUp1Container,
  ["Forgot Password"]: ForgotPasswordContainer
};

const MenuNavigator = createBottomTabNavigator(
  {
    ["Profile"]: ProfileContainer,
    ["Map"]: {
      screen: MapContainer,
      navigationOptions: ToplessMenuNavigationOptions
    }
  },
  {
    tabBarComponent: MenuContainer
  }
);

const AppNavigator: NavigationContainer = createStackNavigator(
  {
    ["Home"]: SignIn1Container,
    ["Logged In"]: MenuNavigator,
    ...SocialNavigationMap,
    ...AuthNavigationMap,
    ...SpotDetailsNavigationMap
  },
  {
    headerMode: "screen",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const createAppRouter = (
  container: NavigationContainer
): NavigationContainer => {
  enableScreens();
  return createAppContainer(container);
};

export const Router: NavigationContainer = createAppRouter(AppNavigator);
