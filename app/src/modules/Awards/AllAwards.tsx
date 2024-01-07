import { Achiever } from "@models/Awards/interface";
import { SectionList, Text, View } from "react-native";
import { useAchievedAwards } from "./hook/useAchievedAwards";
import Loading from "@components/loading/Loading";
import AwardItem from "./AwardItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DefaultAwards from "./DefaultAwards";
import { useUserStore } from "@providers/user/store/useUserStore";

const AllAwards = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const uid = useUserStore((state) => state.user?.uid);
  const { awards, loading, wonAwardsData, onNext } = useAchievedAwards(uid);

  const renderItem = ({ item }: { item: Achiever[] }) => {
    return (
      <View className="flex flex-row p-2">
        {item.map((itemI) => {
          return (
            <AwardItem
              key={itemI.id}
              achiever={itemI}
              isMe={true}
              award={awards[itemI.awardId]}
            />
          );
        })}
      </View>
    );
  };

  const keyExtractor = (item: Achiever[]) => {
    return item[0].id;
  };

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      ) : wonAwardsData.length ? (
        <SectionList
          sections={wonAwardsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={onNext}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { targetMonth } }) => (
            <View className="flex flex-row items-center bg-[#232136] px-4">
              <Text
                className="text-2xl text-white"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                {targetMonth}
              </Text>
              <View className="flex-1 h-px bg-white/20 ml-4" />
            </View>
          )}
          ItemSeparatorComponent={() => <View className="w-0 aspect-square" />}
          ListFooterComponent={<View style={{ height: tabBarHeight + 16 }} />}
        />
      ) : (
        <DefaultAwards />
      )}
    </View>
  );
};

export default AllAwards;
