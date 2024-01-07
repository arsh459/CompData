import { CommonActions, NavigationProp } from "@react-navigation/native";

import { ScreenTypes } from "@screens/CircularProgressScreen";

export const handleContinue = (
  // type: ScreenTypes,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  navigation &&
    navigation.dispatch((state) => {
      const routes = state.routes;

      // streak check comes here

      // const lastScreen = routes[routes.length - 1];

      // const nextScreen = getNextScreen(lastScreen.name);
      // if (nextScreen) {
      //   routes.push({
      //     key: `${nextScreen}-${Math.round(Math.random() * 1000)}`,
      //     name: nextScreen,
      //     // params: { type: "nutrition" },
      //   });
      // } else

      if (routes.length > 1) {
        routes.pop();
      } else {
        routes.push({
          key: `Home-${Math.round(Math.random() * 1000)}`,
          name: "Home",
          // params: { type: "nutrition" },
        });
      }

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });

      /**
       *
       * if no new streak -> start streak
       * else if streakAchieve -> streak achieve
       * else {
       * navigate to getNextScreen(lastScreen))
       * }
       *
       */

      // switch (type) {
      //   case "fitpoint":
      //     routes.push({
      //       key: `CircularProgressScreen-${Math.round(Math.random() * 1000)}`,
      //       name: "CircularProgressScreen",
      //       params: { type: "nutrition" },
      //     });
      //     break;
      //   default:
      //     break;
      // }
    });
};

export const getColor = (type: ScreenTypes) => {
  switch (type) {
    case "fitpoint":
      return "#9C6AFF";
    case "nutrition":
      return "#FFE458";
    default:
      return "#FFFFFF";
  }
};

export const getSubText = (type: ScreenTypes) => {
  switch (type) {
    case "fitpoint":
      return "My Daily Fitpoints";
    case "nutrition":
      return "My Daily Diet Goal";
    default:
      return "test";
  }
};
