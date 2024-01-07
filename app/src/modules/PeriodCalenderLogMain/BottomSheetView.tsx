import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import BasedOnCurrentCycle from "@modules/PeriodTrackerMain/BasedOnCurrentCycle";
import SymptomsSection from "@modules/PeriodTrackerMain/SymptomsSection/SymptomsSection";
import { getCircleData } from "@modules/PeriodTrackerMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import CloseIcon from "@components/SvgIcons/CloseIcon";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const collapsedHeight = 164;
export const expandedHeight = 475;

interface Props {}

const BottomSheetView: React.FC<Props> = ({}) => {
  const ref = useRef<BottomSheet>(null);
  const { todayUnix } = useAuthContext();
  const [expand, setExpand] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { currentObj, cycleEndTime, cycleStTime } = useCurrentPeriodStore(
    (state) => {
      const vieweingPeriodObj =
        state.periodDateObjStore[state.currentlySelectedInMonth];

      if (vieweingPeriodObj)
        return {
          currentObj: vieweingPeriodObj,
          cycleEndTime: state.cycles[vieweingPeriodObj.cycleId]
            ? state.cycles[vieweingPeriodObj.cycleId].endUnix
            : undefined,
          cycleStTime: state.cycles[vieweingPeriodObj.cycleId]
            ? state.cycles[vieweingPeriodObj.cycleId].startUnix
            : undefined,
        };
      else {
        return {};
      }
    }
  );

  const { topText, dayText, date } = getCircleData(
    todayUnix,
    currentObj,
    currentObj?.unix && currentObj.unix > todayUnix ? true : false,
    cycleStTime,
    cycleEndTime
  );

  const onToggle = () => {
    if (expand) {
      ref.current?.collapse();

      weEventTrack("calendar_collapseBottomSheet", {});
    } else {
      ref.current?.expand();
      weEventTrack("calendar_expandBottomSheet", {});
    }

    setExpand((prev) => !prev);
  };

  // const onHandleChange = (index: number) => {
  //   if (index === 1) {
  //     setExpand(true);
  //   } else {
  //     setExpand(false);
  //   }
  // };

  return (
    <BottomSheet
      ref={ref}
      snapPoints={[collapsedHeight, expandedHeight]}
      backgroundStyle={{ backgroundColor: "transparent" }}
      handleIndicatorStyle={{ display: "none" }}
      // onChange={(index) => setExpand(index === 1)}
      // onChange={onHandleChange}
      // index={expand ? 1 : 0}
      index={0}
    >
      <LinearGradient
        colors={["#23213600", "#232136"]}
        className="flex justify-center items-center p-2"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push("PeriodCalenderLogScreen", {
              isEditable: true,
              title: "Edit Period Dates",
            });
            weEventTrack("calendar_editPeriods", {});
          }}
          className="bg-white rounded-lg px-4 py-2"
        >
          <Text
            className="text-sm text-[#FF6069]"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Edit Periods
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      {date ? (
        <>
          <View className="flex-1 flex bg-[#343150] rounded-t-2xl">
            <View className="flex flex-row p-4">
              <View className="flex-1">
                <Text
                  numberOfLines={1}
                  className="flex-1 text-white text-2xl"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {date},
                </Text>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-[#FF6069] text-xl"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {topText} {dayText}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onToggle}
                className="bg-[#524D88] rounded-full w-8 aspect-square p-2 ml-4"
              >
                {expand ? (
                  <CloseIcon color="#FFFFFF" />
                ) : (
                  <ArrowIcon direction="top" color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            {expand ? (
              <>
                <SymptomsSection view="month" />
                <View>
                  <BasedOnCurrentCycle
                    heading="Your Insights"
                    view="month"
                    itemBGColor="#524D88"
                  />
                </View>
              </>
            ) : null}

            <View className="flex-1" />
          </View>
        </>
      ) : null}
    </BottomSheet>
  );
};

export default BottomSheetView;
