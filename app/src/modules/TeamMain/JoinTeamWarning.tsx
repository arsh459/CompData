import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { plusSignWhite } from "@constants/imageKitURL";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  joinRequest: () => Promise<void>;
  joinEventFunc: (eventName: string) => void;
}

const JoinTeamWarning: React.FC<Props> = ({ joinRequest, joinEventFunc }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePress = () => {
    setIsOpen(true);
    joinEventFunc("TeamScreen_clickJoinTeam");
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ButtonWithIcon
        iconUrl={plusSignWhite}
        title="Join Team"
        onPress={handlePress}
        textColor="text-[#fff]"
        textStyle="pl-2 text-[11px] iphoneX:text-[13px]"
        roundedStr="rounded-lg "
        bgColor="flex-1"
        iconStyle="w-[11px] aspect-square"
        layoutStyle={{
          padding: 8,
          justifyContent: "center",
          backgroundColor: "#2AA9FF",
        }}
      />
      <UseModal
        visible={isOpen}
        onClose={onClose}
        width="w-full"
        height="h-full"
        blurAmount={20}
        tone="dark"
      >
        <CloseBtn
          onClose={onClose}
          classStr="w-4 aspect-square self-end mx-4"
        />
        <View className="bg-[#292832] border border-[#474646] rounded-xl m-4">
          <View
            className="bg-[#FF5970] rounded-xl"
            style={{
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <Text
              className="text-white text-lg iphoneX:text-xl px-4 py-2.5"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Are you sure?
            </Text>
          </View>
          <Text
            className="text-white text-base iphoneX:text-lg p-4"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            You will lose your current progress in the round if you switch your
            team. We suggest you switch your team after you finish this round.
          </Text>
          <View className="h-px bg-[#474646]" />
          <View className="flex flex-row">
            <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
              <Text
                className="text-white text-center text-lg iphoneX:text-xl px-4 py-2.5"
                style={{ fontFamily: "BaiJamjuree-Medium" }}
              >
                No
              </Text>
            </TouchableOpacity>
            <View className="w-px bg-[#474646]" />
            <TouchableOpacity style={{ flex: 1 }} onPress={joinRequest}>
              <Text
                className="text-white text-center text-lg iphoneX:text-xl px-4 py-2"
                style={{ fontFamily: "BaiJamjuree-Medium" }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </UseModal>
    </>
  );
};

export default JoinTeamWarning;
