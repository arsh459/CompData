import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { getGameNameReadable } from "@utils/challange/utils";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import FilterTasksModal from "./FilterTaskModal";
const FilterTasks = () => {
  const [isFilterTasksModalOpen, setFilterTasksModal] =
    useState<boolean>(false);
  const { profile, selectedGameId, setSelectedGameId } = useProfileContext();
  const userGames =
    profile && profile.participatingInGameWithTeam
      ? Object.keys(profile.participatingInGameWithTeam)
      : [];
  return (
    <>
      <View className="flex flex-row items-center justify-center p-4 text-center ">
        <Text className="mr-2 text-lg iphoneX:text-2xl font-extrabold leading-9 text-white">
          {!selectedGameId ? "All Tasks" : getGameNameReadable(selectedGameId)}
        </Text>
        {userGames.length > 0 ? (
          <Pressable
            className="w-2 iphoneX:w-3 h-2 iphoneX:h-3"
            onPress={() => setFilterTasksModal(true)}
          >
            <ArrowIcon color="#FFFFFF" direction="bottom" />
          </Pressable>
        ) : null}
      </View>
      <FilterTasksModal
        isOpen={isFilterTasksModalOpen}
        onCloseModal={() => setFilterTasksModal(false)}
        selectedGameId={selectedGameId}
        setSelectedGameId={setSelectedGameId}
        userGames={userGames}
      />
    </>
  );
};
export default FilterTasks;
