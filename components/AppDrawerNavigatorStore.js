import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import NotificationScreen from "../screens/NotificationScreen";
import OrderedItemsScreen from "../screens/OrderedItemsScreen";
import ProfileScreen from "../screens/ProfileScreenStore";
import RequestedItemsScreen from "../screens/RequestedItemsScreen";
import { AppStackNavigator } from "./AppStackNavigationStore";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenuStore";

export const AppDrawerNavigatorStore = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
    },
    OrderedItems: {
      screen: AppStackNavigator,
    },
    RequestedItems: {
      screen: RequestedItemsScreen,
    },
    Notifications: {
      screen: NotificationScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
