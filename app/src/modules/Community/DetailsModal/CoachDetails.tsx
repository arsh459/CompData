import CloseBtn from "@components/Buttons/CloseBtn";
import { CoachRank } from "@models/Activity/Activity";
import { getFPsToDisplay } from "@modules/HomeScreen/NewHome/utils";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { View, Text } from "react-native";

interface Props {
  coachRank: CoachRank;
  onCloseModal: () => void;
}

const CoachDetails: React.FC<Props> = ({ coachRank, onCloseModal }) => {
  const { params } = useGameContext();
  const { teamMembersCount } = useTeamContext();

  return (
    <>
      <View className="flex flex-row items-center justify-end">
        <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
      </View>
      <View className="rounded-lg my-4 bg-[#2E2C3E] flex flex-row justify-center items-center p-4">
        <View className="flex-1 flex">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-xl font-bold text-white"
          >
            {coachRank.teamName}
          </Text>
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className=" text-xs text-white pr-2"
          >
            {teamMembersCount} Players
          </Text>
        </View>
        <View className="flex-1 flex flex-row justify-end items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white font-extrabold mx-2"
          >
            {getFPsToDisplay(coachRank, params?.currentSprint?.id)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default CoachDetails;
