import { View, ScrollView } from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ActivityLogs from "./ActivityLogs";
import FitPointStreak from "./FitPointStreak";
import MyGoal from "./MyGoal";
// import JourneyLogOnboard, {
//   onboardJourneyStateType,
// } from "@modules/HomeScreen/GuidedOnboard/JourneyLogOnboard";

interface Props {}
const JourneyLogMain: React.FC<Props> = ({}) => {
  // const [onboardState, setOnboardState] =
  //   useState<onboardJourneyStateType>("unknown");
  const tabBarHeight = useBottomTabBarHeight();
  // const ActivityLogsRef = useRef<View>(null);
  // const FitPointStreakRef = useRef<View>(null);
  // const scrollRef = useRef<ScrollView>(null);

  // useEffect(() => {
  // setTimeout(() => {
  //   setOnboardState("welcome");
  //   setTimeout(() => {
  //     setOnboardState("FitPointStreak");
  //   }, 3000);
  // }, 1000);
  // }, []);

  return (
    <ScrollView
      // ref={scrollRef}
      bounces={false}
      className="flex-1"
    >
      <MyGoal />
      <View
        // ref={FitPointStreakRef}
        collapsable={false}
      >
        <FitPointStreak />
      </View>
      <View
        //ref={ActivityLogsRef}
        collapsable={false}
      >
        <ActivityLogs />
      </View>
      {/* <JourneyLogOnboard
        onboardState={onboardState}
        setOnboardState={setOnboardState}
        ActivityLogsRef={ActivityLogsRef}
        FitPointStreakRef={FitPointStreakRef}
        scrollRef={scrollRef}
      /> */}
      <View style={{ height: tabBarHeight + 16 }} />
    </ScrollView>
  );
};

export default JourneyLogMain;
