import { waBaseLink } from "@constants/links";
import { useSelectedEvent } from "@hooks/event/useSelectedEvent";
import LeaveTeam from "@modules/LeaveTeam";
import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";

const AlreadyInTeam = () => {
  const { user } = useUserContext();
  const { game } = useGameContext();
  const navigation = useNavigation();

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  const team = user?.participatingInGameWithTeam
    ? user.participatingInGameWithTeam[game ? game.id : ""]
    : undefined;

  const { selectedEvent } = useSelectedEvent(team ? team.teamId : "");

  const isOwner = user?.uid === team?.ownerUID ? true : false;

  const openWhatsApp = () => {
    weEventTrack("click_wa", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to know more about my team")}`
    );
  };

  return (
    <View className="fixed left-0 right-0 top-0 bottom-0 z-10 overflow-y-scroll scrollbar-hide flex flex-col justify-center items-center p-4">
      {selectedEvent?.id ? (
        <LeaveTeam
          visible={showLeaveModal}
          onClose={() => setShowLeaveModal(false)}
          teamId={selectedEvent.id}
          userId={user?.uid}
        />
      ) : null}
      <Text className="text-[#F5F5F7] text-lg iphoneX:text-2xl font-bold pt-2 text-center">
        You already have a team!
      </Text>
      <View className="text-[#F5F5F7] flex flex-row justify-center">
        <Text className="text-[#F5F5F7]">You are part of the team: </Text>
        <Text className="text-[#F5F5F7] pl-2 font-semibold">
          {selectedEvent?.name}
        </Text>
      </View>

      <Text className="text-[#F5F5F7] text-center text-xs iphoneX:text-base">
        {isOwner
          ? "If you want to make someone else the team leader. Reach out to us"
          : "If you change your team, your progress with this team will be lost"}
      </Text>

      <View className="flex flex-row justify-center pt-4">
        {isOwner ? (
          <Pressable className="mx-4" onPress={openWhatsApp}>
            <Text className="text-gray-700 text-xs iphoneX:text-base">
              Contact Us
            </Text>
          </Pressable>
        ) : (
          <Pressable className="mx-4" onPress={() => setShowLeaveModal(true)}>
            <Text className="text-red-500 text-xs iphoneX:text-base">
              Leave Team
            </Text>
          </Pressable>
        )}
        <Pressable
          className="mx-4"
          onPress={() => navigation.navigate("Community")}
        >
          <Text className="text-[#F5F5F7] text-xs iphoneX:text-base">
            Go To Team
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AlreadyInTeam;
