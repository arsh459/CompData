import { View, Text, Image } from "react-native";

import StartButton from "@modules/HomeScreen/NewHome/StartButton";

// import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { bottomRunnigStaticImage } from "@constants/imageKitURL";
import { sectionTypes } from "..";
// import { useTaskContext } from "@providers/task/TaskProvider";
import SingleButton from "./SingleButton";
// import { getDistanceToShow } from "./utils";
interface Props {
  section?: sectionTypes;
  setSection: (val: sectionTypes) => void;

  onStart: () => void;
  onPause: () => void;
  onFinish: () => void;
  onNext: () => void;
  onShare: () => void;
  earnedFP: number;
}
const Buttons: React.FC<Props> = ({
  section,
  setSection,

  onStart,
  onPause,
  onFinish,
  onNext,
  onShare,
  earnedFP,
}) => {
  return (
    <View className="">
      {section === "running" ? (
        <SingleButton
          onPress={() => {
            setSection("pause");
            onPause();
          }}
          img="https://ik.imagekit.io/socialboat/Component_56_5hoABM0hv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015388426"
        />
      ) : null}
      {section === "pause" ? (
        <View className="flex items-center flex-row justify-evenly pt-7">
          <SingleButton
            onPress={() => {
              setSection("ended");
              onFinish();
            }}
            img="https://ik.imagekit.io/socialboat/Component_56__1__lXPwrQFZI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015482388"
            text="End Run"
          />
          <SingleButton
            onPress={() => {
              setSection("running");
              onStart();
            }}
            img="https://ik.imagekit.io/socialboat/Component_57_r-XGd2bG7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668015482685"
            text="Resume"
          />
        </View>
      ) : null}
      {section === "ended" ? (
        <View className="flex-1 ">
          <Text
            className="text-[#FFFFFF] flex-1 text-lg text-center  py-2"
            style={{ fontFamily: "BaiJamjuree-SemiBold" }}
          >
            Congratulations! Earned {earnedFP ? `${earnedFP} FP` : "0FP"}.
          </Text>
          <View className="pb-4 w-4/5 mx-auto">
            <StartButton
              title="Do Another Task"
              bgColor="bg-[#1293FE]"
              textColor="text-[#FFFFFF] "
              roundedStr="rounded-md"
              textStyle="py-2 text-center text-lg iphoneX:text-xl rounded-md"
              onPress={onNext}
              fontFamily="BaiJamjuree-Bold"
            />
          </View>
          {/* <View className="pb-4 w-4/5 mx-auto">
            <ButtonWithIcon
              iconUrl={shareIcon}
              title="Share My Run"
              textColor="text-[#100F1A] "
              textStyle="pl-2 text-lg iphoneX:text-xl"
              roundedStr="rounded-lg py-2 flex justify-center flex-row"
              iconStyle="w-[18px] aspect-square "
              onPress={onShare}
              fontFamily="BaiJamjuree-SemiBold"
              layoutStyle={{ backgroundColor: "#FFFFFF" }}
            />
          </View> */}
        </View>
      ) : null}
      <View className="flex justify-around">
        <View className="px-4  pb-8 iphoneX:pb-2">
          <Image
            source={{ uri: bottomRunnigStaticImage }}
            resizeMode="contain"
            className="w-full h-32"
          />
        </View>
      </View>
    </View>
  );
};

export default Buttons;
