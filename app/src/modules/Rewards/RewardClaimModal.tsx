import { View, Text, SafeAreaView, ScrollView } from "react-native";

import UseModal from "@components/UseModal";
import CloseBtn from "@components/Buttons/CloseBtn";
import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import BadgeCombo from "./BadgeCombo";
import RewardBtn from "./RewardBtn";
import PriceDetail from "./PriceDetail";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
}
const RewardClaimModal: React.FC<Props> = ({ isOpen, onCloseModal }) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      bgColor="bg-[#100F1A]"
    >
      <SafeAreaView className=" p-4 flex-1">
        <ScrollView>
          <View className="flex flex-row justify-between items-center">
            <Text
              className="text-white text-xl iphoneX:text-2xl"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Want to Claim already ?
            </Text>
            <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
          </View>
          <View className="flex flex-row justify-center py-9 items-center">
            <View className="w-[13%]   relative ">
              {/* <View className="w-6   "> */}
              <NewBadge unLockedHeight={1} />
              {/* </View> */}
              <Text className="text-[#FFFFFF99]  text-[8px] absolute bottom-0 -right-[15%]  ">
                x14
              </Text>
            </View>
            <Text className="text-white px-5">=</Text>
            <Text className="text-white">INR 4,900</Text>
          </View>

          <View className="  flex   relative border border-[#7485F175] ">
            <Text
              className="text-white bg-[#7B72D885] text-base iphoneX:text-lg px-4 py-2 iphoneX:py-3"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Your Next Projected Value
            </Text>
            <View className="flex flex-row items-center p-2">
              <BadgeCombo
                firstBadgeCountText="x77"
                secondBadgeCountText="x14"
                symbol="+"
              />
              <PriceDetail
                value="INR 15,900"
                valueText="Your Projected Value"
              />
            </View>
            <Text
              className="text-white p-4"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              <Text className="text-[#83FFAD]  ">Pro tip : </Text>
              Unlock 8 more cards and Your value will be INR 15,900 OR lose it
              all by claiming now
            </Text>
          </View>
        </ScrollView>
        <View className="flex flex-row justify-center py-2">
          <RewardBtn
            btnTextOne="Go for INR,15,900"
            bgColor="#FF5970"
            textColorOne="#fff"
            btnTextOneStyle="w-4/5 text-center  text-lg iphoneX:text-xl"
            roundedStr="rounded"
            btnLayout="flex flex-row justify-center items-center"
          />
        </View>
        <View className="flex flex-row justify-center relative">
          <RewardBtn
            btnTextOne="I’ll Go For Claim!"
            bgColor="#100F1AC9"
            textColorOne="#8C9CA8"
            btnTextOneStyle="w-4/5 text-center text-lg iphoneX:text-xl"
            roundedStr="rounded"
            btnLayout="flex flex-row justify-center items-center  rounded border border-[#8C9CA8]"
          />
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default RewardClaimModal;
