// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

/**
 * @format
 */

import {
  onMessageReceived,
  updatePendingUserNav,
} from "@utils/notifications/uttils";
import messaging from "@react-native-firebase/messaging";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

messaging().setBackgroundMessageHandler(onMessageReceived);
import notifee, { EventType } from "@notifee/react-native";
import {
  getNotifeeDNData,
  parseEventDetail,
} from "@providers/notification/utils";
// import { saveNotification } from "@models/notifee/methods";
import { trackNotification } from "@providers/notificationPermissions/hooks/trackNotification";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const remoteObj = parseEventDetail(detail);

  if (remoteObj) {
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      const dnData = getNotifeeDNData(remoteObj);

      if (dnData && remoteObj.uid) {
        updatePendingUserNav(remoteObj.uid, dnData);

        //   setDNResult(dnData);
      }

      // decrement
      notifee.decrementBadgeCount();
    }

    trackNotification(type, remoteObj.title);

    //   state.uid && saveNotification(state.uid, remoteObj);
  }
});

AppRegistry.registerComponent(appName, () => App);
