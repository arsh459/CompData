import { UserRank } from "@models/Activity/Activity";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import DetailCard from "./DetailCard";
import { shareNatively } from "@components/ShareWrapper";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { createTeamInviteLinkV2 } from "@utils/dynamicLinks/inviteLink";
import ListHeaderComponent from "./ListHeaderComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { getCurrentPlayerPts } from "@modules/HomeScreen/NewHome/utils";
import { getSortedTeamRanks } from "@utils/rank/utils";

interface Props {
  myTeam: boolean;
  sprintId: string;
}

const MyTeamMembers: React.FC<Props> = ({ myTeam, sprintId }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { coachRank, userRanks } = useTeamProgressContext();
  const onRankClick = (rank: UserRank) => {
    navigation.navigate("ContributionScreen", {
      uid: rank.uid,
      sprintId,
    });
  };

  const renderItem = ({ item, index }: { item: UserRank; index: number }) => {
    return (
      <View className="px-4">
        <DetailCard
          userRank={item}
          onPress={() => onRankClick(item)}
          currentSprintId={sprintId}
          showTeamRank={true}
          rankIndex={index}
        />
      </View>
    );
  };

  const { state } = useAuthContext();
  const { user } = useUserContext();

  const keyExtractor = (item: UserRank) => item.uid;

  const handleInvite = async () => {
    if (user?.uid && state.gameId) {
      const remoteSHareURL = await createTeamInviteLinkV2(
        user?.uid,
        user?.userKey ? user?.userKey : ""
      );

      shareNatively(remoteSHareURL, route.name);
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        data={getSortedTeamRanks(userRanks, sprintId)}
        renderItem={renderItem}
        ListHeaderComponent={
          <ListHeaderComponent
            myTeam={myTeam}
            coachRank={coachRank}
            sprintId={sprintId}
          />
        }
        ListFooterComponent={
          <Text
            className="text-white text-base p-4"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {myTeam
              ? "Note : Your Team should be Rank 1 in order to win the trophy."
              : "Note : Team with Rank 1 will win the trophy."}
          </Text>
        }
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />

      {myTeam ? (
        <TouchableOpacity
          onPress={handleInvite}
          className="bg-white rounded-full flex flex-row justify-center items-center p-3 m-4"
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#14131E",
              borderRadius: 100,
            }}
          >
            <Text className="text-[#14131E] text-center text-2xl aspect-square">
              +
            </Text>
          </View>
          <View className="w-6" />
          <Text
            className="text-[#14131E] text-xl"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            Add A New Player
          </Text>
        </TouchableOpacity>
      ) : null}
      {/* {openModal ? (
        <ContributionModal
          visible={openModal ? true : false}
          onClose={() => setOpenModal(undefined)}
          userRank={openModal}
          currentSprintId={sprintId}
        />
      ) : null} */}
    </View>
  );
};

export default MyTeamMembers;
