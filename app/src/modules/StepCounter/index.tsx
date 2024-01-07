import { View, Text, Button, Switch } from "react-native";
import { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";
// import BackgroundGeolocation, {
//   // Location,
//   Subscription,
// } from "react-native-background-geolocation";
// import { useAuthContext } from "@providers/auth/AuthProvider";

// import BackgroundGeolocation from "react-native-background-geolocation";

const StepCounter = () => {
  const [stepCount, setStepCount] = useState<number>(0);
  const [sevenDayStep, setSevenDaySteps] = useState<number>(0);
  const [location] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);

  // const { state } = useAuthContext();

  const [time, setTime] = useState<number>(Date.now());

  const resetTime = () => setTime(Date.now());

  // useEffect(() => {
  //   if (state.uid) {
  //     /// 1.  Subscribe to events.
  //     const onLocation: Subscription = BackgroundGeolocation.onLocation(
  //       (location) => {
  //         setLocation(JSON.stringify(location, null, 2));
  //       }
  //     );

  //     const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
  //       (event) => {
  //       }
  //     );

  //     const onActivityChange: Subscription =
  //       BackgroundGeolocation.onActivityChange((event) => {
  //       });

  //     const onProviderChange: Subscription =
  //       BackgroundGeolocation.onProviderChange((event) => {
  //       });

  //     /// 2. ready the plugin.
  //     BackgroundGeolocation.ready({
  //       // Geolocation Config
  //       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  //       distanceFilter: 10,
  //       // Activity Recognition
  //       stopTimeout: 5,
  //       // Application config
  //       debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
  //       logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  //       stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
  //       startOnBoot: true, // <-- Auto start tracking when device is powered-up.
  //       // HTTP / SQLite config
  //       url: "https://asia-south1-holidaying-prod.cloudfunctions.net/location",
  //       batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
  //       autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
  //       headers: {
  //         // <-- Optional HTTP headers
  //       },
  //       params: {
  //         // <-- Optional HTTP params
  //         uid: state.uid,
  //         // auth_token: "maybe_your_server_authenticates_via_token_YES?",
  //       },
  //     }).then((state) => {
  //       setEnabled(state.enabled);

  //     });

  //     return () => {
  //       // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
  //       // during development live-reload.  Without this, event-listeners will accumulate with
  //       // each refresh during live-reload.
  //       onLocation.remove();
  //       onMotionChange.remove();
  //       onActivityChange.remove();
  //       onProviderChange.remove();
  //     };
  //   }
  // }, [state.uid]);

  /// 3. start / stop BackgroundGeolocation
  // useEffect(() => {
  //   if (enabled) {
  //     BackgroundGeolocation.start();
  //   } else {
  //     BackgroundGeolocation.stop();
  //     setLocation("");
  //   }
  // }, [enabled]);

  useEffect(() => {
    const stepCountSubscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
    // BackgroundGeolocation.watchPosition(
    //   (location) => {
    //     setLocation(JSON.stringify(location));
    //   },
    //   undefined,
    //   { interval: 1 }
    // );

    return () => {
      stepCountSubscription.remove();
      // BackgroundGeolocation.stopWatchPosition();
    };
  }, []);

  useEffect(() => {
    const getStepCount = async () => {
      const now = new Date(time);
      const dayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      const ct = await Pedometer.getStepCountAsync(
        // new Date(time - 7 * 24 * 60 * 60 * 1000),
        dayStart,
        now
      );

      setSevenDaySteps(ct.steps);
    };

    getStepCount();
  }, [time]);

  return (
    <View className="p-4">
      <Button title="Reset Time" onPress={resetTime} />
      <Text className="text-center text-white text-xl">
        Watching: You walked {stepCount} steps.
      </Text>
      <Text className="text-center text-white text-xl">
        Today Count: You walked {sevenDayStep} steps.
      </Text>
      <Text className="text-white pt-4">
        Click to enable BackgroundGeolocation
      </Text>
      <Switch value={enabled} onValueChange={setEnabled} />
      <Text
        className="text-white"
        // style={{ fontFamily: "monospace", fontSize: 12 }}
      >
        {location}
      </Text>
      {/* <Text className="text-center text-white text-xl">{location}</Text> */}
    </View>
  );
};

export default StepCounter;
