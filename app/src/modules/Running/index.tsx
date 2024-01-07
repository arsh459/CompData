import { BackHandler, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import StatsNoMap from "./RunningStats/StatsNoPause";
import StartRunning from "./RunningState/StartRunning";
import { useCountDown } from "@hooks/steps/useCountDown";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { mapIcon, stateIcon } from "@constants/imageKitURL";
import Header from "@modules/Header";
import StatsMap from "./RunningStats/StatsMap";
import MapsRunning from "./RunningStats/MapsRunning";
import { useLocationContext } from "@providers/location/LocationProvider";
// import { getPace } from "@providers/location/hooks/utils";
import Buttons from "./Buttons/Buttons";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { usePace } from "@providers/location/hooks/usePace";
import WarnBoxModal from "@modules/HomeScreen/MyProgress/WarnBoxModal";
// import { useTaskContext } from "@providers/task/TaskProvider";
import { calculateFP, submitResult } from "./utils";
import { useUserContext } from "@providers/user/UserProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { Task } from "@models/Tasks/Task";
// import { PermissionsAndroid } from "react-native";
export type sectionTypes = "loading" | "running" | "pause" | "ended";

interface Props {
  attemptedDate: string;
  task?: Task;
}

const RunningMain: React.FC<Props> = ({ attemptedDate, task }) => {
  // use these
  const {
    secondsElapsed,
    locResponse,
    onStart,
    onFinish,
    onPause,
    onRemoveSubscription,
  } = useLocationContext();

  const [section, setSection] = useState<sectionTypes>("loading");
  const [isMapView, setIsMapView] = useState(false);
  const [showWarning, toggleWarning] = useState<boolean>(false);

  const { counter } = useCountDown(3);

  const navigation = useNavigation();

  const goBack = () => {
    onRemoveSubscription();
    navigation.goBack();
  };

  useEffect(() => {
    if (counter !== 0) return;

    const timer = setTimeout(() => {
      setSection("running");
      onStart();
    }, 500);

    return () => clearTimeout(timer);
  }, [counter]);

  useKeepAwake();

  // const { task } = useTaskContext();
  const { user } = useUserContext();
  const { state } = useAuthContext();

  const distanceInMeter = Math.round(locResponse.distance);
  const [fpEarnt, setFpEarnt] = useState<number>(0);

  const onFinishRun = async () => {
    // remove listeners
    onFinish();

    if (task && user) {
      const fpFinal = calculateFP(
        task.distance,
        distanceInMeter,
        task.fitPoints
      );
      setFpEarnt(fpFinal);

      await submitResult(
        task,
        user,
        state.gameId,
        0,
        attemptedDate,
        fpFinal * 300,
        secondsElapsed,
        locResponse.coordsArray,
        distanceInMeter
      );
    }

    // set map view false
    setIsMapView(true);
  };

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      // onStopStreaming();
      toggleWarning(true);

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);

  // const pace = getPace(distanceInMeter / 1000, secondsElapsed);

  const { pace } = usePace(locResponse.distance, secondsElapsed);
  const onNext = () => {
    navigation.navigate("PostInteraction", {
      badgeId: task?.badgeId ? task.badgeId : "",
    });
  };

  // const paceM = pace.minutes;
  // const paceS = pace.seconds;

  // const requestFineLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  // {
  //   title: "Location Permission",
  //   message: " App needs access to your Location Permission ",
  //   buttonNeutral: "Ask Me Later",
  //   buttonNegative: "Cancel",
  //   buttonPositive: "OK",
  // }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     } else {
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     checkPermission();
  //   }, 1000);
  // }, []);

  // const checkPermission = async () => {
  //   try {
  //     const result = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     );

  //     if (result == true) {
  //       // you code
  //     } else if (result == false) {
  //       const status = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: "Location Permission",
  //           message: " App needs access to your Location Permission ",
  //           buttonNeutral: "Ask Me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );

  //       if (status === "never_ask_again") {
  //         // Your code
  //       } else if (status === "denied") {
  //         checkPermission();
  //       } else if (status === "granted") {
  //         // Your code
  //       }
  //     }
  //   } catch (error: any) {
  //   }
  // };
  const rightModalClick = async () => {
    // await onStartWorkout();

    toggleWarning(false);

    setTimeout(() => goBack(), 500);
  };

  const onClose = () => {
    toggleWarning(false);
  };

  switch (section) {
    case "loading":
      return (
        <View className="flex-1  ">
          <StartRunning counter={counter} />
        </View>
      );
    case "running":
    case "pause":
    case "ended":
      return (
        <View className="flex-1 bg-[#13121E]">
          <WarnBoxModal
            cta1="No"
            cta2="Yes"
            text="Do You Want to leave the task"
            onLeftClick={onClose}
            onRightClick={rightModalClick}
            isOpen={showWarning}
            onClose={onClose}
          />
          <Header
            back={true}
            onBack={() =>
              section === "ended" ? goBack() : toggleWarning(true)
            }
            headerColor={"transparent"}
            tone="dark"
            headerType="transparent"
            optionNode={
              <View className="flex flex-row justify-center items-center">
                <View className="w-4" />
                <ButtonWithIcon
                  iconUrl={isMapView ? stateIcon : mapIcon}
                  title={isMapView ? "Stats View" : `Map View`}
                  textColor="text-[#fff] "
                  textStyle="pl-2 text-xs iphoneX:text-sm "
                  roundedStr="rounded-full py-2  px-4"
                  iconStyle="w-[12px] aspect-square "
                  fontFamily="BaiJamjuree-Bold"
                  layoutStyle={{
                    backgroundColor: "#1875F5",
                    alignItems: "center",
                  }}
                  onPress={() => setIsMapView((prev) => !prev)}
                />
              </View>
            }
          />
          {isMapView ? (
            <StatsMap>
              <MapsRunning
                timeElapsed={secondsElapsed}
                distance={distanceInMeter}
                paceStr={
                  pace.minutes && pace.seconds
                    ? `${pace.minutes}:${pace.seconds}`
                    : "00:00"
                }
              />
            </StatsMap>
          ) : (
            <StatsNoMap
              timeElapsed={secondsElapsed}
              distance={distanceInMeter}
              totalDistance={task?.distance}
              paceStr={
                pace.minutes && pace.seconds
                  ? `${pace.minutes}:${pace.seconds}`
                  : "00:00"
              }
            >
              {/* <Pressable
                onPress={() => {
                  setSection("pause");
                  onPause();
                }}
                className="flex items-center"
              >
                <Image
                  source={{
                    uri: "https://ik.imagekit.io/socialboat/Component_56_5hoABM0hv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015388426",
                  }}
                  resizeMode="contain"
                  className="w-24 aspect-square"
                />
              </Pressable> */}
            </StatsNoMap>
          )}

          <Buttons
            setSection={setSection}
            section={section}
            onStart={onStart}
            onPause={onPause}
            onFinish={onFinishRun}
            onNext={onNext}
            onShare={() => {}}
            earnedFP={fpEarnt}
          />
        </View>
      );
    // case "pause":
    //   return (
    //     <View className="flex-1  ">
    //       <Header
    //         back={true}
    //         headerColor={"transparent"}
    //         tone="dark"
    //         headerType="transparent"
    //         optionNode={
    //           <View className="flex flex-row justify-center items-center">
    //             <View className="w-4" />
    //             <ButtonWithIcon
    //               iconUrl={isMapView ? stateIcon : mapIcon}
    //               title={isMapView ? "Stats View" : `Map View`}
    //               textColor="text-[#fff] "
    //               textStyle="pl-2 text-xs iphoneX:text-sm "
    //               roundedStr="rounded-full py-2  px-4"
    //               iconStyle="w-[12px] aspect-square "
    //               fontFamily="BaiJamjuree-Bold"
    //               layoutStyle={{
    //                 backgroundColor: "#1875F5",
    //                 alignItems: "center",
    //               }}
    //               onPress={() => setIsMapView((prev) => !prev)}
    //             />
    //           </View>
    //         }
    //       />
    //       {isMapView ? (
    //         <StatsMap>
    //           <MapsRunning
    //             section={section}
    //             setSection={setSection}
    //             timeElapsed={secondsElapsed}
    //             distance={distanceInMeter}
    //             paceStr={paceM && paceS ? `${paceM}:${paceS}` : "00:00"}
    //             onStart={onStart}
    //             onPause={onPause}
    //             onFinish={onFinish}
    //           />
    //         </StatsMap>
    //       ) : (
    //         <StatsNoMap
    //           timeElapsed={secondsElapsed}
    //           distance={distanceInMeter}
    //           paceStr={paceM && paceS ? `${paceM}:${paceS}` : "00:00"}
    //         >
    //           <View className="flex items-center flex-row justify-evenly">
    //             <Pressable
    //               onPress={() => {
    //                 setSection("ended");
    //                 onFinish();
    //               }}
    //               className="flex items-center"
    //             >
    //               <Image
    //                 source={{
    //                   uri: "https://ik.imagekit.io/socialboat/Component_56__1__lXPwrQFZI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015482388",
    //                 }}
    //                 resizeMode="contain"
    //                 className="w-24 aspect-square"
    //               />
    //               <Text
    //                 className="text-[#FFFFFF80]  text-lg pl-1 pt-2"
    //                 style={{ fontFamily: "BaiJamjuree-SemiBold" }}
    //               >
    //                 End Run
    //               </Text>
    //             </Pressable>
    //             <Pressable
    //               className="flex items-center"
    //               onPress={() => {
    //                 setSection("running");
    //                 onStart();
    //               }}
    //             >
    //               <Image
    //                 source={{
    //                   uri: "https://ik.imagekit.io/socialboat/Component_57_r-XGd2bG7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015482685",
    //                 }}
    //                 resizeMode="contain"
    //                 className="w-24 aspect-square"
    //               />
    //               <Text
    //                 className="text-[#FFFFFF80]  text-lg pl-1 pt-2"
    //                 style={{ fontFamily: "BaiJamjuree-SemiBold" }}
    //               >
    //                 Resume
    //               </Text>
    //             </Pressable>
    //           </View>
    //         </StatsNoMap>
    //       )}
    //     </View>
    //   );
    // case "ended":
    //   return (
    //     // <View className="flex-1">
    //     //   <EndRunning />
    //     // </View>
    //     <StatsMap>
    //       <MapsRunning
    //         section={section}
    //         setSection={setSection}
    //         timeElapsed={secondsElapsed}
    //         distance={distanceInMeter}
    //         paceStr={paceM && paceS ? `${paceM}:${paceS}` : "00:00"}
    //         onStart={onStart}
    //         onPause={onPause}
    //         onFinish={onFinish}
    //       />
    //     </StatsMap>
    //   );
    default:
      return null;
  }
};

export default RunningMain;
