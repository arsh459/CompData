import ImageWithURL from "@components/ImageWithURL";
import LineDivider from "@components/LineDivider";
import Loading from "@components/loading/Loading";
import { Achiever } from "@models/Awards/interface";
import { UserInterface } from "@models/User/User";
import AwardItem from "@modules/Awards/AwardItem";
import { useAchievedAwards } from "@modules/Awards/hook/useAchievedAwards";
import { icons } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/constants";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View, SectionList, Text } from "react-native";
import { shallow } from "zustand/shallow";
import StreakCard from "./StreakCard";
import { useViewerStreakStore } from "@providers/streakV2/store/useViewerStreak";

interface Props {
  ListHeaderComponent: () => JSX.Element;
  profile?: UserInterface;
}

const OverviewComp: React.FC<Props> = ({ ListHeaderComponent, profile }) => {
  const isMe = useUserStore(({ user }) => user?.uid === profile?.uid, shallow);

  const { awards, loading, wonAwardsData, onNext } = useAchievedAwards(
    profile?.uid,
    isMe ? false : true
  );

  const { streakId } = useViewerStreakStore(
    (state) => ({
      streakId: state.streak?.id,
    }),
    shallow
  );

  const renderItem = ({ item }: { item: Achiever[] }) => {
    return (
      <View className="flex flex-row p-2">
        {item.map((itemI) => {
          return (
            <AwardItem
              key={itemI.id}
              isMe={isMe}
              achiever={itemI}
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

  const ListHeaderComponentRemote = () => {
    return (
      <>
        {ListHeaderComponent()}
        {profile?.thingsToWorkOn?.length ? (
          <View className="p-4">
            <Text
              className="text-white text-lg py-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {`${isMe ? "My" : profile.name || "User"} Goal`}
            </Text>

            <View className="flex justify-between items-center bg-[#343150] rounded-xl">
              {profile.thingsToWorkOn.map((item, index) => (
                <View
                  key={item.text}
                  className="w-full flex flex-row justify-between items-center px-4 py-2 border-white/10"
                  style={{ borderTopWidth: index === 0 ? undefined : 1 }}
                >
                  <Text
                    className="text-white capitalize text-xs iphoneX:text-sm"
                    style={{ fontFamily: "Nunito-Regular" }}
                  >
                    {item.text}
                  </Text>
                  <ImageWithURL
                    source={{ uri: icons[item.type] }}
                    className="w-8 iphoneX:w-10 aspect-square ml-3"
                  />
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {streakId ? (
          <View className="p-4">
            <Text
              className="text-white text-lg py-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              My Streak
            </Text>
            <StreakCard />
          </View>
        ) : null}
        <>
          {wonAwardsData.length ? (
            <Text
              className="text-white text-lg px-4 pt-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {`${isMe ? "My" : profile?.name || "User"} Achievements`}
            </Text>
          ) : null}
          {!wonAwardsData.length && !profile?.thingsToWorkOn?.length ? (
            <View className="flex justify-center items-center pt-10">
              <Text
                className="text-white/80 text-base px-4 pt-4"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                No Achievements So Far
              </Text>
            </View>
          ) : null}
        </>
      </>
    );
  };

  return (
    <>
      {/* {!loading ? ListHeaderComponent() : null} */}
      {loading ? (
        <View className="flex-1 flex justify-start items-center py-5 iphoneX:py-8">
          <Loading width="w-12" height="h-12" />
        </View>
      ) : !wonAwardsData.length ? (
        <>{ListHeaderComponentRemote()}</>
      ) : (
        <SectionList
          sections={wonAwardsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={onNext}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { targetMonth } }) => (
            <LineDivider
              text={targetMonth}
              color="#FFFFFF"
              line="after"
              clsStr="pt-4 pr-5 bg-[#232136]"
            />
          )}
          ItemSeparatorComponent={() => <View className="w-0 aspect-square" />}
          ListHeaderComponent={ListHeaderComponentRemote}
        />
      )}
    </>
  );
};

export default OverviewComp;
