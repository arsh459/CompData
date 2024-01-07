import GradientText from "@components/GradientText";
import { filledSakhiIcon } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { StreakProvider } from "@providers/streak/StreakProvider";
import { useEffect, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import TodayFp from "../MyProgress/TodayFp";

interface Props {
  onClose: () => void;
  headText: string;
  subText: string;
}

const HomeWelcome: React.FC<Props> = ({ onClose, headText, subText }) => {
  const { width } = useWindowDimensions();

  let ind = 1;
  const [typingText, setTypingText] = useState(" ");

  useEffect(() => {
    const interval = setInterval(() => {
      if (ind < subText.length) {
        setTypingText(subText.substring(0, ind));
      } else {
        clearInterval(interval);
      }
      ind++;
    }, 100);

    return () => clearInterval(interval);
  }, [subText]);

  return (
    <>
      <View className="flex-1 py-4">
        <View className="px-4">
          <GradientText
            text={headText}
            textStyle={{
              fontSize: width > iPhoneX ? 32 : 28,
              fontFamily: "Quicksand-Bold",
              color: "white",
            }}
            colors={["#75E0DF", "#7B8DE3"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>

        <View className="flex flex-row justify-center items-center p-4">
          <Image
            source={{ uri: filledSakhiIcon }}
            className="w-1/4 max-w-xs aspect-[81/45] "
            resizeMode="contain"
          />

          <View className="flex-1 pl-4">
            {/* <GradientText
              text={typingText}
              textStyle={{
                fontSize: 16,
                fontFamily: "Quicksand-Bold",
                color: "white",
              }}
              colors={["#75E0DF", "#7B8DE3"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            /> */}
            <Text
              className="text-base text-white"
              style={{ fontFamily: "Quicksand-Bold" }}
            >
              {typingText}
            </Text>
          </View>
        </View>

        <StreakProvider>
          <TodayFp hideAppointment={true} />
        </StreakProvider>
      </View>
      <TouchableOpacity onPress={onClose} className="m-4 bg-white rounded-full">
        <Text className="text-black text-base text-center font-bold my-3">
          Get Started
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default HomeWelcome;
