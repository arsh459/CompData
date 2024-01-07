import UseModal from "@components/UseModal";
import clsx from "clsx";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import EarnedFitPointBox from "./EarnedFitPointBox";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  earnedFP: number;
  totalFP: number;
  msg: string;
  awardLevels?: { text: string; fitPoints: number }[];
}

const EarnedFitPointModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  earnedFP,
  totalFP,
  awardLevels,
  msg,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-full"
      height="h-full"
      bgColor="bg-[#100F1A]"
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex flex-col justify-center m-4">
        <EarnedFitPointBox
          earnedFP={earnedFP}
          totalFP={totalFP}
          msg={msg}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <View className="h-4" />
        <View className="rounded-lg bg-[#333240]">
          <View className="flex flex-row justify-between items-center px-4 py-3">
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Task
            </Text>
            <Text
              className="text-white text-xl"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Fitpoints
            </Text>
          </View>
          <View className="h-px bg-[#100F1A]" />
          <ScrollView className="max-h-48" bounces={false}>
            {awardLevels?.map((item, index, arr) => (
              <View
                className={clsx(
                  "flex flex-row justify-between items-center px-4",
                  index === arr.length - 1 ? "py-4" : "pt-4"
                )}
                key={index}
              >
                <Text
                  className="text-white"
                  style={{ fontFamily: "BaiJamjuree-Regular" }}
                >
                  {item.text}
                </Text>
                <Text
                  className="text-white"
                  style={{ fontFamily: "BaiJamjuree-Regular" }}
                >
                  Earn {item.fitPoints} FP
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default EarnedFitPointModal;
