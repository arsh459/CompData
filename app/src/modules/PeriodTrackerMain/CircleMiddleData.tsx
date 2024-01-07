import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import { getCircleData } from "./utils";
import { circleSize } from "./CircleDashed";
import TopLabelText from "./MiddleCircleComponents/TopLabelText";
import DayText from "./MiddleCircleComponents/DayText";
import InsightText from "./MiddleCircleComponents/InsightText";
import CTAButton from "./MiddleCircleComponents/CTAButton";
// import DateLabel from "./MiddleCircleComponents/DateLabel";
import { useAuthContext } from "@providers/auth/AuthProvider";
import TringleLoading from "@components/TringleLoading";

import { shallow } from "zustand/shallow";
import { useOnboardContext } from "./PeriodGuidedOnboard/OnboardProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {}

const CircleMiddleData: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const { todayUnix } = useAuthContext();

  const loading = useCurrentPeriodStore((state) => state.loading);
  const { periodTrackerInsight } = useOnboardContext();

  const {
    currentObj,
    cycleEndTime,
    cycleStTime,
    insight,
    prompt,
    cyclesPresent,
  } = useCurrentPeriodStore((state) => {
    const mainInsights = state.mainInsights[state.currentlySelected];
    // item are here

    const vieweingPeriodObj = state.periodDateObjStore[state.currentlySelected];

    if (vieweingPeriodObj)
      return {
        cyclesPresent: state.cyclesArray.length > 0,
        currentObj: vieweingPeriodObj,
        cycleEndTime: state.cycles[vieweingPeriodObj.cycleId]
          ? state.cycles[vieweingPeriodObj.cycleId].endUnix
          : undefined,
        cycleStTime: state.cycles[vieweingPeriodObj.cycleId]
          ? state.cycles[vieweingPeriodObj.cycleId].startUnix
          : undefined,
        insight: mainInsights?.insight ? mainInsights.insight : "",
        prompt: mainInsights?.prompt ? mainInsights.prompt : "",
      };
    else {
      return {
        cyclesPresent: state.cyclesArray.length > 0,
      };
    }
    // else {
    //   return {
    //     // stTime: state.startUnix,
    //   };
    // }
  }, shallow);

  const {
    topText,
    // date,
    cta,
    dayText,
    insightTextColor,
    insightBgColor,
    ctaColor,
    ctaTextColor,
  } = getCircleData(
    todayUnix,
    currentObj,
    currentObj?.unix && currentObj.unix > todayUnix ? true : false,
    cycleStTime,
    cycleEndTime,
    cyclesPresent
  );

  // const insight = currentObj?.insight
  //   ? currentObj.insight
  //   : stTime
  //   ? `You marked your first period on ${format(
  //       new Date(stTime),
  //       "do MMM"
  //     )}. Log past periods to improve predictions`
  //   : "";

  const onMiddleClick = () => {
    navigation.navigate("PeriodCalenderLogScreen", {
      isEditable: true,
      title: "Edit Period Dates",
    });

    weEventTrack("period_clickLogPeriod", {});
  };

  return (
    <View
      style={{
        width: circleSize,
        height: circleSize,
      }}
      className="flex absolute flex-1 justify-center items-center"
    >
      {loading ? (
        <View className="flex justify-center items-center">
          <TringleLoading boxWidth={70} />
        </View>
      ) : (
        <>
          <View className="">
            {topText ? <TopLabelText topText={topText} /> : null}
            <View className="pt-1">
              {dayText ? <DayText dayText={dayText} /> : null}
            </View>
          </View>
          {insight && prompt ? (
            <View
              className="mt-4"
              collapsable={false}
              ref={periodTrackerInsight}
            >
              <InsightText
                insight={insight}
                prompt={prompt}
                insightBgColor={insightBgColor}
                insightTextColor={insightTextColor}
              />
            </View>
          ) : null}
          {cta ? (
            <View className="pt-6">
              <CTAButton
                onPress={onMiddleClick}
                cta={cta}
                ctaColor={ctaColor}
                ctaTextColor={ctaTextColor}
              />
            </View>
          ) : null}
          {/* {date ? (
            <View className=" absolute bottom-6">
              <DateLabel date={date} />
            </View>
          ) : null} */}
        </>
      )}
    </View>
  );
};

export default CircleMiddleData;
