import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { useEventUsers } from "@hooks/event/useEventUsers";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { getCurrentMonth } from "@utils/challange/challengeWeekUtils";
import { View, Text, FlatList } from "react-native";
import MemberCard from "./MemberCard";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const MembersModal: React.FC<Props> = ({ visible, onClose }) => {
  const { game } = useGameContext();
  const { team, teamMembersCount } = useTeamContext();
  const currentMonth = getCurrentMonth(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );
  const { members } = useEventUsers(
    game?.id,
    team?.id,
    5,
    currentMonth,
    visible
  );

  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      width="w-full"
      height="h-full"
      bgColor="bg-gray-100"
    >
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <View className="py-2">
            <MemberCard
              member={item}
              EarnedFP={
                item?.monthPointObj ? item.monthPointObj[currentMonth] : 0
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.uid}
        ListHeaderComponent={
          <View className="flex items-end bg-gray-100 p-4">
            <CloseBtn onClose={onClose} color="#000000" />
            <View className="w-full flex flex-row justify-between items-end">
              <Text className="flex-1 text-xl iphoneX:text-3xl font-extrabold italic">
                {team?.name}
              </Text>
              <Text className="opacity-60 text-xs iphoneX:text-base whitespace-nowrap">
                {teamMembersCount} Players
              </Text>
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
        bounces={false}
      />
    </UseModal>
  );
};

export default MembersModal;
