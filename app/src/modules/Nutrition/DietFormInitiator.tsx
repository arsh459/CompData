import ImageWithURL from "@components/ImageWithURL";
import { arrowDailyOnboard, dietFormIcon } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { View, Text } from "react-native";

interface Props {
  onNext: () => void;
}
const DietFormInitiator: React.FC<Props> = ({ onNext }) => (
  <>
    <View className="flex-1 flex items-center justify-center ">
      <ImageWithURL
        source={{ uri: dietFormIcon }}
        className="w-1/2 mt-10 aspect-[218/212] "
      />
      <View className="flex w-4/5 pt-10 items-center justify-start  mx-auto">
        <Text
          className=" text-white text-xl "
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Welcome to PRO! Let's start with your diet plan
        </Text>
        <Text
          className=" text-white/80 text-xs pl-1 pt-3  w-full "
          style={{ fontFamily: "Nunito-Light" }}
        >
          Help us understand your goals and lifestyle to get a curated diet plan
        </Text>
      </View>
      <ImageWithURL
        source={{ uri: arrowDailyOnboard }}
        className="w-1/2 aspect-square"
      />
    </View>
    <View className="w-11/12 mx-auto pb-10">
      <StartButton
        title={"Fill The Form"}
        bgColor="bg-[#6D55D1]"
        textColor="text-[#fff] "
        roundedStr="rounded-2xl"
        textStyle="py-3 text-center text-xl  "
        onPress={onNext}
        fontFamily="Nunito-Bold"
      />
    </View>
  </>
);

export default DietFormInitiator;
