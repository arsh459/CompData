import { dateObject } from "@hooks/program/useProgramTasks";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Text, Pressable, FlatList, View, Dimensions } from "react-native";
import RoundedCircleButton from "./RoundedCircleButton";
interface Props {
  daysArray?: dateObject[];
  selectedDay?: string;
  setDay: (val: dateObject) => void;
  nowObj?: dateObject;
  dayPointObj?: {
    [day: string]: number;
  };
  selectedMonth: string;
  setMonth: (val: string) => void;
}

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 6;

const now = new Date();
const nowUnix = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  0,
  0,
  0,
  0
).getTime();
const nowFormatted = format(now, "yyyy-MM-dd");

const DaysScroll: React.FC<Props> = ({
  daysArray,
  selectedDay,
  setDay,
  // finale,
  dayPointObj,
  nowObj,
  selectedMonth,
  setMonth,
}) => {
  const ref = useRef<FlatList>(null);
  const [unscrolled, setInitialScrollStatus] = useState<boolean>(false);

  useEffect(() => {
    if (!unscrolled && selectedDay) {
      if (ref.current && daysArray) {
        let toIndex: number = 0;
        for (const dayObj of daysArray) {
          if (dayObj.formattedDate === selectedDay) {
            break;
          }

          toIndex++;
        }

        setTimeout(
          () =>
            ref?.current?.scrollToIndex({
              animated: true,
              index: toIndex,
              // viewPosition: 1,
              // viewOffset: 50,
              viewPosition: 0,
            }),
          500
        );
        setInitialScrollStatus(true);
      }
    }
  }, [unscrolled, selectedDay, daysArray]);

  const renderItem = ({
    item: day,
    index,
  }: {
    item: dateObject;
    index: number;
  }) => {
    let state: "past" | "now" | "future" | "unknown" = "unknown";
    const dt = new Date(day.formattedDate).getTime();

    if (nowFormatted === day.formattedDate) {
      state = "now";
    } else if (dt < nowUnix) {
      state = "past";
    } else {
      state = "future";
    }

    let bgColor: string = "";
    let ringColor: string = "";
    let textColor: string = "text-white";
    // finale
    if (day.isFinale) {
      bgColor = "#000";
      ringColor = "#C03B4E";
      textColor = "text-[#F2D56F]";
    }
    // now
    else if (state === "now") {
      bgColor = "#0085E0";
      ringColor = "#0085E0";
    } else if (state === "future") {
      // future
      bgColor = "#ADADAD";
      ringColor = "#ADADAD";
    } else if (
      state === "past" &&
      dayPointObj &&
      dayPointObj[day.formattedDate]
    ) {
      // past done
      bgColor = "#6EC576";
      ringColor = "#6EC576";
    } else {
      bgColor = "#ADADAD";
      ringColor = "#ADADAD";
    }

    // selected
    const isSelectedDay = day.formattedDate === selectedDay;
    if (daysArray)
      return (
        <Pressable
          style={{ width: ITEM_WIDTH }}
          className={clsx(
            // daysArray.length - 1 === index ? "mr-4" : "pr-8",
            "ml-4 flex flex-col justify-center items-center relative z-0"
          )}
          onPress={() => {
            setDay(day);
            weEventTrack("workoutSelect_clickDay", {
              dayNumber: day.dayNumber,
            });
          }}
        >
          <Text className="mb-2 text-center" style={{ color: bgColor }}>
            {day.dayName}
          </Text>

          <RoundedCircleButton
            bgColor={bgColor}
            noRing={isSelectedDay ? false : true}
            ringColor={ringColor}
            textColor={textColor}
            text={format(parseISO(day.formattedDate), "d")}
            lockedOverlay={state === "future"}
            MainCircleHWString={isSelectedDay ? "" : "h-10 w-10"}
            RingHWString="h-12 w-12"
          />

          {day.isWarmup ? (
            <Text className="mt-2 text-center" style={{ color: bgColor }}>
              Warmup
            </Text>
          ) : null}
        </Pressable>
      );
    else {
      return <View />;
    }
  };

  const keyExtractor = (item: dateObject, index: number) => `${item}-${index}`;
  const getItemLayout = (
    _: ArrayLike<dateObject> | null | undefined,
    index: number
  ) => {
    return {
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    };
  };

  return (
    <>
      {daysArray && (
        <FlatList
          ref={ref}
          data={daysArray}
          // initialScrollIndex={5}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          // ListFooterComponent={<View style={{ width: width }} />}
        />
      )}
    </>
  );
};
export default DaysScroll;
