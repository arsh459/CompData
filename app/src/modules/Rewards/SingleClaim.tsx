import { View, Text } from "react-native";
import { useState } from "react";
import RewardBtn from "./RewardBtn";
import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import RewardClaimModal from "./RewardClaimModal";
import BlurBG from "@components/BlurBG";
interface Props {
  colorOne?: string;
  colorTwo?: string;
  amount?: string;
  numberCard?: string;
  onPressHandle?: () => void;
}
const SingleClaim: React.FC<Props> = ({
  colorOne,
  colorTwo,
  amount,
  numberCard,
  onPressHandle,
}) => {
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
          blurAmount={20}
          fallbackColor="#100F1A"
        />
        <View className="flex flex-row justify-around  items-center p-4 relative  rounded-sm overflow-hidden">
          <BlurBG
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            blurType="dark"
            blurAmount={35}
            fallbackColor="#100F1A"
          />
          <View className="flex flex-row items-center ">
            <View className="w-5">
              <NewBadge
                unLockedHeight={1}
                colorOne={colorOne}
                colorTwo={colorTwo}
              />
            </View>
            <Text
              className="text-[#FFFFFF] pl-1 iphoneX:pl-2 text-base"
              style={{ fontFamily: "BaiJamjuree-Medium" }}
            >
              {numberCard}
            </Text>
          </View>
          <Text
            className="text-[#FFFFFF] text-lg   px-4"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            =
          </Text>

          <Text
            className="text-[#FFFFFF] text-lg"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {amount}
          </Text>
        </View>
        <View className="pt-4">
          <RewardBtn
            bgColor="#FF5970"
            textColorOne="#FFFFFF"
            btnTextOne="You can withdraw this Card set"
            btnLayout="flex flex-row justify-center px-4 items-center"
            onPressHandle={() => setIsOpen(true)}
          />
        </View>
      </View>

      <RewardClaimModal isOpen={isOpen} onCloseModal={() => setIsOpen(false)} />
    </>
  );
};

export default SingleClaim;
