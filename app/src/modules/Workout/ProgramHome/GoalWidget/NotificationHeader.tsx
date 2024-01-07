import MembersImage from "@components/MembersImage";
import { useTeamContext } from "@providers/team/TeamProvider";
import { View, Text } from "react-native";
const NotificationHeader = () => {
  const { teamMembers: members, team: selectedEvent } = useTeamContext();

  return (
    <View className="w-full flex flex-row text-white bg-[#4F4F4F] py-2 items-center iphoneX:py-3  ">
      <View className="mx-3">
        <MembersImage
          members={members}
          hidePlusOthers={true}
          size={"small"}
          ring={true}
          dark={true}
        />
      </View>

      <View className="  text-xs iphoneX:text-base flex-1  leading-[8px] ">
        <Text
          className="pr-px  text-lg  iphoneX:text-xl font-semibold  text-white "
          numberOfLines={2}
        >
          {selectedEvent?.name}
        </Text>
        <Text className=" text-[.7rem] text-white ">
          {selectedEvent?.enrolledUserUIDs
            ? `${selectedEvent.enrolledUserUIDs.length} Members`
            : "0 Members"}
        </Text>
      </View>
    </View>
  );
};
export default NotificationHeader;
