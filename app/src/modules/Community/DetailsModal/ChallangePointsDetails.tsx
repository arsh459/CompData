import { useCalendarView } from "@hooks/activity/useCalendarView";
import { SprintObject } from "@models/Event/Event";
import { FlatList, Text, View } from "react-native";

interface Props {
  name?: string;
  dayPointObj?: { [dayString: string]: number };
  gameStarts?: number;
  sprints?: SprintObject[];
  leaderboardMonth?: string;
  ListHeaderComponent?: () => JSX.Element;
  isTeam?: boolean;
}

const ChallangePointsDetails: React.FC<Props> = ({
  name,
  dayPointObj,
  gameStarts,
  sprints,
  leaderboardMonth,
  ListHeaderComponent,
  isTeam,
}) => {
  const { savedList } = useCalendarView(gameStarts, sprints, leaderboardMonth);
  const ListFooter = (
    <Text className="text-[13px] text-center text-[#DDDFF4] p-6">
      This table consist of all the Fitpoints in {"\n"} everyday earned by this
      team
    </Text>
  );
  return (
    <>
      {!isTeam ? (
        <View className="rounded-xl bg-[#2E2C3E]">
          <View className="flex flex-row p-4">
            <Text
              numberOfLines={1}
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-white self-center flex-1 text-lg iphoneX:text-2xl font-extrabold"
            >
              {name}
            </Text>
          </View>
          <View className="h-px bg-[#100F1A]" />
          {dayPointObj && savedList.length ? (
            <FlatList
              data={savedList}
              renderItem={({ item }) => (
                <View className="w-1/3 self-center text-center">
                  <Text
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                    className="text-lg iphoneX:text-2xl font-extrabold text-[#FD6F6F] text-center"
                  >
                    {dayPointObj && dayPointObj[item.key]
                      ? `${dayPointObj[item.key]} FP`
                      : "-"}
                  </Text>
                  <Text
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                    className="text-[#808D97] text-[10px] iphoneX:text-xs text-center"
                  >
                    {item.label}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.key}
              className="h-48 py-2"
              numColumns={3}
            />
          ) : null}
        </View>
      ) : dayPointObj && savedList.length ? (
        <View className="flex-1 ">
          <FlatList
            data={savedList}
            renderItem={({ item, index }) => (
              <View
                className="w-1/3 self-center text-center bg-[#2E2C3E]"
                style={
                  index === 0
                    ? { borderTopLeftRadius: 12 }
                    : index === 2
                    ? { borderTopRightRadius: 12 }
                    : index === savedList.length - 1
                    ? { borderBottomRightRadius: 12 }
                    : index === savedList.length - 2
                    ? { borderBottomLeftRadius: 12 }
                    : {}
                }
              >
                <Text
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  className="text-lg iphoneX:text-2xl font-extrabold text-[#FD6F6F] text-center"
                >
                  {dayPointObj && dayPointObj[item.key]
                    ? `${dayPointObj[item.key]} FP`
                    : "-"}
                </Text>
                <Text
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  className="text-[#808D97] text-[10px] iphoneX:text-xs text-center"
                >
                  {item.label}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
            className=" py-2 flex-1"
            numColumns={3}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooter}
          />
        </View>
      ) : null}
    </>
  );
};

export default ChallangePointsDetails;
