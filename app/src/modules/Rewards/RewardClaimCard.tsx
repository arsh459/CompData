import { View, Text } from "react-native";
import { useState } from "react";
import RewardBtn from "./RewardBtn";
import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import EarnMoreModal from "./EarnMoreModal";
import BlurBG from "@components/BlurBG";
interface Props {}
const RewardClaimCard: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <View className="bg-[#100F1A70] p-5 rounded-sm relative overflow-hidden">
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
          blurAmount={10}
          fallbackColor="#100F1A"
        />
        <View className="flex flex-row justify-around items-center p-4 relative  rounded-sm overflow-hidden">
          <BlurBG
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 4,
            }}
            blurType="dark"
            blurAmount={20}
            fallbackColor="#100F1A"
          />
          <View className="flex flex-row items-center ">
            <View className="w-5">
              <NewBadge
                unLockedHeight={1}
                colorOne="#EADAA6"
                colorTwo="#9C874E"
              />
            </View>
            <Text
              className="text-[#FFFFFF] pl-1 iphoneX:pl-2 text-base"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              X 4 Card
            </Text>
          </View>
          <Text
            className="text-[#FFFFFF]  px-2  iphoneX:px-4 text-xl "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            &#43;
          </Text>
          <View className="flex flex-row items-center">
            <View className="w-5">
              <NewBadge unLockedHeight={1} />
            </View>
            <Text
              className="text-[#FFFFFF]  pl-1 iphoneX:pl-2  text-base"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              X 1 Cards
            </Text>
          </View>
        </View>
        <View className="pt-4">
          <RewardBtn
            bgColor="#FF5970"
            textColorOne="#FFFFFF"
            btnTextOne="Your Project Value"
            btnTextTwo="INR 15,900"
            textColorTwo="#FFFFFF"
            btnLayout="flex flex-row justify-between px-4 items-center"
            onPressHandle={() => setIsOpen(true)}
          />
        </View>
      </View>

      <EarnMoreModal isOpen={isOpen} onCloseModal={() => setIsOpen(false)} />
    </>
  );
};

export default RewardClaimCard;
