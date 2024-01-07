import { dateKey, useCalendarView } from "@hooks/activity/useCalendarView";
import { SprintObject } from "@models/Event/Event";
import clsx from "clsx";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";

interface Props {
  name?: string;
  dayPointObj?: { [dayString: string]: number };
  gameStarts?: number;
  sprints?: SprintObject[];
  leaderboardMonth?: string;
  ListHeaderComponent?: () => JSX.Element;
  handleScroll: (val: number) => void;
}

const TeamChallangePointsDetails: React.FC<Props> = ({
  dayPointObj,
  gameStarts,
  sprints,
  leaderboardMonth,
  ListHeaderComponent,
  handleScroll,
}) => {
  const numColumns = 3;
  const { savedList } = useCalendarView(gameStarts, sprints, leaderboardMonth);
  const arrayLength = savedList.length;
  const ListFooter = (
    <Text className="text-[13px] text-center text-[#DDDFF4] p-6">
      This table consist of all the Fitpoints in {"\n"} everyday earned by this
      team
    </Text>
  );

  const data = [...savedList];
  const num = arrayLength % numColumns;
  for (let index = 0; index < numColumns - num; index++) {
    data.push({ key: `${index}-key`, label: "-" });
  }

  function renderItem(item: dateKey, index: number) {
    return (
      <>
        <View
          className={clsx(
            "w-1/3 self-center text-center px-2 pb-4 bg-[#2E2C3E]",
            index === 0 || index === 1 || index === 2 ? "pt-4" : ""
          )}
          style={
            index === 0
              ? { borderTopLeftRadius: 12 }
              : index === 2
              ? { borderTopRightRadius: 12 }
              : index === data.length - 1
              ? { borderBottomRightRadius: 12 }
              : index === data.length - 3
              ? { borderBottomLeftRadius: 12 }
              : {}
          }
        >
          <Text
            style={{
              fontFamily: "BaiJamjuree-Bold",
              opacity: item.label === "-" ? 0 : undefined,
            }}
            className="text-lg iphoneX:text-2xl font-extrabold text-[#FD6F6F] text-center"
          >
            {dayPointObj && dayPointObj[item.key]
              ? `${dayPointObj[item.key]} FP`
              : "-"}
          </Text>
          <Text
            style={{
              fontFamily: "BaiJamjuree-Bold",
              opacity: item.label === "-" ? 0 : undefined,
            }}
            className="text-[#808D97] text-[10px] iphoneX:text-xs text-center"
          >
            {item.label}
          </Text>
        </View>
      </>
    );
  }

  const keyExtractor = (item: dateKey) => item.key;

  return (
    <>
      {dayPointObj && savedList.length ? (
        <FlatList
          data={data}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={keyExtractor}
          className="flex-1"
          bounces={false}
          numColumns={3}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooter}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
            handleScroll(e.nativeEvent.contentOffset.y)
          }
          columnWrapperStyle={{ paddingHorizontal: 16 }}
        />
      ) : null}
    </>
  );
};

export default TeamChallangePointsDetails;
