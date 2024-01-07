import MembersImage from "@components/MembersImage";
import ShareWrapper from "@components/ShareWrapper";
import { LeaderBoard } from "@models/Leader/LeaderBoard";
import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import MembersModal from "../MembersModal";
import { EventInterface } from "@models/Event/Event";

interface Props {
  team?: EventInterface;
  challangeName?: string;
  teamMembers?: LeaderBoard[];
  teamMembersCount?: number;
}

const EventBrief: React.FC<Props> = ({
  team,
  challangeName,
  teamMembers,
  teamMembersCount,
}) => {
  const [membersModalVisible, setMembersModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <View className="p-4 bg-white">
        <Text
          numberOfLines={1}
          className="text-2xl iphoneX:text-3xl font-extrabold font-sans"
        >
          {challangeName}
        </Text>
        <Text numberOfLines={1} className="text-lg iphoneX:text-xl font-sans">
          {team?.name}
        </Text>
        <View className="flex flex-row items-center justify-evenly py-4">
          {teamMembers ? (
            <Pressable
              onPress={() => {
                setMembersModalVisible(true);
              }}
            >
              <MembersImage
                members={teamMembers}
                membersCount={teamMembersCount}
              />
            </Pressable>
          ) : null}
          <ShareWrapper shareURL="https://socialboat.page.link/Game">
            <View className="border border-[#203C51] rounded-lg px-4 iphoneX:px-6 py-1 flex flex-row items-center">
              <Text className="text-[#203C51] text-xl iphoneX:text-2xl font-extralight">
                +
              </Text>
              <Text className="text-[#203C51] text-lg iphoneX:text-xl pl-4">
                Invite
              </Text>
            </View>
          </ShareWrapper>
        </View>
      </View>
      <MembersModal
        visible={membersModalVisible}
        onClose={() => setMembersModalVisible(false)}
      />
    </>
  );
};

export default EventBrief;
