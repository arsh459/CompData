import { View, Text, Pressable, Image } from "react-native";
import ShareWrapper from "@components/ShareWrapper";
import MembersModal from "../MembersModal";
import { useTeamContext } from "@providers/team/TeamProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { graphBarWhiteIcon, sendIcon } from "@constants/imageKitURL";

const EventBriefV2 = () => {
  const { team } = useTeamContext();
  const [membersModalVisible, setMembersModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <LinearGradient
        colors={["#3F3B6A1F", "#605AA61F"]}
        className="rounded-2xl mx-4 mb-8"
      >
        <Text
          numberOfLines={1}
          className="text-[#203C51] text-lg iphoneX:text-xl font-extrabold font-sans px-4 py-2"
        >
          {team?.name}
        </Text>
        <View className="flex flex-row items-center justify-between p-2">
          <View className="w-1/2 p-2">
            <Pressable
              onPress={() => {
                setMembersModalVisible(true);
              }}
              className="bg-[#3F3B6A75] rounded-lg flex flex-row justify-center items-center py-1"
            >
              <Image
                source={{ uri: graphBarWhiteIcon }}
                resizeMode="contain"
                className="w-3 iphoneX:w-3.5 h-3 iphoneX:h-3.5"
              />
              <Text className="text-white text-sm iphoneX:text-base pl-2.5">
                Team Stats
              </Text>
            </Pressable>
          </View>
          <ShareWrapper
            shareURL="https://socialboat.page.link/Game"
            classStr="w-1/2 p-2"
          >
            <View className="bg-white rounded-lg flex flex-row justify-center items-center py-1">
              <Image
                source={{ uri: sendIcon }}
                resizeMode="contain"
                className="w-3 iphoneX:w-3.5 h-3 iphoneX:h-3.5"
              />
              <Text className="text-[#FF5970] text-sm iphoneX:text-base pl-2.5">
                Send Invite
              </Text>
            </View>
          </ShareWrapper>
        </View>
      </LinearGradient>
      <MembersModal
        visible={membersModalVisible}
        onClose={() => setMembersModalVisible(false)}
      />
    </>
  );
};

export default EventBriefV2;
