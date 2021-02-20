import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import {AppStackNavigator} from "./AppStackNavigationCustomer"
import CustomSideBarMenu from "./CustomSideBarMenuCustomer";
import MyOrdersScreen from '../screens/MyOrdersScreen'
import MyRequestsScreen from "../screens/MyRequestsScreen";
import ProfileScreen from "../screens/ProfileScreenCustomer";
import NotificationScreen from "../screens/NotificationScreen";

export const AppDrawerNavigatorCustomer = createDrawerNavigator(
  {
    Home: {
      screen: AppStackNavigator,
    },
    MyOrders: {
      screen: MyOrdersScreen,
    },
    MyRequests: {
      screen: MyRequestsScreen,
    },
    Notifications: {
      screen: NotificationScreen,
    },
    Profile:{
      screen: ProfileScreen,
    }
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
