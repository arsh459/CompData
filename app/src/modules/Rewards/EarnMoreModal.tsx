import { View, Text, SafeAreaView, ScrollView } from "react-native";

import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import BadgeCombo from "./BadgeCombo";
import RewardBtn from "./RewardBtn";
import PriceDetail from "./PriceDetail";
import BlurBG from "@components/BlurBG";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
}
const EarnMoreModal: React.FC<Props> = ({ isOpen, onCloseModal }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      blurAmount={88}
      fallbackColor="#100F1A"
    >
      <SafeAreaView className=" px-4 pt-6 flex-1">
        <ScrollView>
          <View className="flex flex-row justify-between items-center pb-7">
            <Text
              className="text-white text-xl iphoneX:text-2xl"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Want to Earn More ?
            </Text>
            <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
          </View>
          <View className="flex flex-row items-center p-3  relative overflow-hidden rounded-md border border-[#7485F175]">
            <BlurBG
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 4,
              }}
              blurType="light"
              blurAmount={35}
              fallbackColor="#100F1AC9"
            />
            <BadgeCombo
              firstBadgeCountText="x77"
              secondBadgeCountText="x14"
              symbol="+"
            />
            <PriceDetail value="INR 15,900" valueText="Your Projected Value" />
          </View>
          <Text
            className="text-white py-7 self-center text-xs iphoneX:text-sm"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            You need to unlock 13 Gold Cards & 13 basic cards more to increase
            your player value
          </Text>

          <View className="py-2">
            <RewardBtn
              btnTextOne="Let’s Start!"
              bgColor="#FF5970"
              textColorOne="#fff"
              btnTextOneStyle=" text-center  text-xl"
              roundedStr="rounded-md"
              btnLayout="flex flex-row justify-center items-center"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </UseModal>
  );
};

export default EarnMoreModal;
