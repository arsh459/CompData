import "react-native-gesture-handler";

import { enableScreens } from "react-native-screens";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import AuthWrappedMainStack from "@routes/AuthWrappedMainStack";
import { Platform, StatusBar } from "react-native";
import codePush from "react-native-code-push";
import * as Sentry from "@sentry/react-native";
import * as SplashScreen from "expo-splash-screen";

// import { Settings } from "react-native-fbsdk-next";

// Settings.initializeSDK();

// import { enableLatestRenderer } from "react-native-maps";

// Settings.defaultZoneName = "America/Los_Angeles";
// DateTime.local().zoneName; //=> 'America/New_York'
// SplashScreen.preventAutoHideAsync();

// enableLatestRenderer();
enableScreens();

import TVTemplate from "@modules/TVTemplate";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef } from "react";

// import { useAttest } from "@hooks/attest/useAttest";

// import { weEventTrack } from "@utils/analytics/webengage/userLog";
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: "https://47ad70d8ab3d430980c68b459443aa7a@o1289977.ingest.sentry.io/4505584834117632",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.

  tracesSampleRate: 0.01,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableUserInteractionTracing: true,
    }),
  ],
});

function App() {
  // const isHermes = () => !!global.HermesInternal;
  // const [appIsReady, setAppIsReady] = useState(false);
  // const [appIsReady, setAppIsReady] = useState(false);

  // useAttest();
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const navigationRef =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);

  return Platform.isTV ? (
    <TVTemplate />
  ) : (
    <NavigationContainer
      ref={navigationRef}
      // onReady={() => {
      //   // Register the navigation container with the instrumentation
      //   routingInstrumentation.registerNavigationContainer(navigationRef);
      // }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="light-content"
          animated={true}
        />
        <AuthWrappedMainStack />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default codePush(Sentry.wrap(App));
