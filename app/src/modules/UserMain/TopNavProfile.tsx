import * as React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import ActivitiesCarousal from "./ActivitiesCarousal";
// import TeamCarousal from "./TeamCarousal";
// import TaskCarousal from "./TaskCarousal";
import { View } from "react-native";
// import { iPhoneX } from "@constants/screen";

// const Tab = createMaterialTopTabNavigator();

interface Props {
  color: string;
}

const TopNavProfile: React.FC<Props> = ({}) => {
  // const { width } = useWindowDimensions();

  return (
    <View />
    // <Tab.Navigator
    //   initialRouteName="Feed"
    //   screenOptions={{
    //     lazy: true,
    //     tabBarActiveTintColor: color,
    //     tabBarIndicatorStyle: { height: 4, backgroundColor: color },
    //     tabBarStyle: { backgroundColor: "#D5D5E4" },
    //     tabBarInactiveTintColor: "#00000080",
    //     tabBarLabelStyle: {
    //       fontSize: width > iPhoneX ? 16 : 12,
    //       fontWeight: "bold",
    //       textTransform: "capitalize",
    //     },
    //   }}
    // >
    //   <Tab.Screen
    //     name="Activities"
    //     component={ActivitiesCarousal}
    //     options={{ tabBarLabel: "Activities" }}
    //   />
    //   <Tab.Screen
    //     name="Teams"
    //     component={TeamCarousal}
    //     options={{ tabBarLabel: "Teams" }}
    //   />
    //   <Tab.Screen
    //     name="My Tasks"
    //     component={TaskCarousal}
    //     options={{ tabBarLabel: "My Tasks" }}
    //   />
    // </Tab.Navigator>
  );
};

export default TopNavProfile;
