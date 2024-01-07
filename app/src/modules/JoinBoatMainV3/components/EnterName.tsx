import GradientText from "@components/GradientText";
import { socialboatSakhiLogoColor2 } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  onNameSave: (name?: string) => void;
  progress?: number;
}

const EnterName: React.FC<Props> = ({ onNameSave, progress }) => {
  // console.log("RenderTest EnterName");
  const { width } = useWindowDimensions();
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);
  const [userName, onNameUpdate] = useState<string>();

  const userNameDB = useUserStore((state) => state.user?.name, shallow);

  useEffect(() => {
    if (userNameDB) {
      onNameUpdate(userNameDB);
    }
  }, [userNameDB]);

  const onNext = () => {
    setIsNextClicked(true);

    setTimeout(() => {
      setTimeout(() => {
        setIsNextClicked(false);
      }, 1000);

      onNameSave(userName);
    }, 2000);
  };

  return (
    <JoinBoatWrapper
      title={
        isNextClicked
          ? ""
          : Platform.OS === "ios"
          ? "What will be your SB Username?"
          : "Let's Start with your name?"
      }
      onNext={isNextClicked ? undefined : onNext}
      progress={isNextClicked ? undefined : progress}
      disabled={!userName}
    >
      {!isNextClicked ? (
        <View className="p-4">
          <TextInput
            className="w-full mx-auto px-4 text-white text-3xl iphoneX:text-4xl border-b border-[#757575]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            value={userName}
            onChangeText={(text: string) => onNameUpdate(text)}
            placeholder="Meera"
            placeholderTextColor="#75757580"
            blurOnSubmit
          />
        </View>
      ) : (
        <View className="w-full h-full flex flex-col justify-center items-center">
          <View className="flex flex-row justify-center items-center">
            <Image
              source={{ uri: socialboatSakhiLogoColor2 }}
              className="w-2/3 max-w-xs aspect-square"
              resizeMode="contain"
            />
          </View>
          <View className="w-3/4 flex flex-row justify-center items-center mx-auto py-4">
            <GradientText
              text="Nice to meet you "
              textStyle={{
                fontSize: width > iPhoneX ? 24 : 16,
                fontFamily: "BaiJamjuree-Bold",
                fontWeight: "900",
                color: "white",
              }}
              colors={["#75E0DF", "#7B8DE3"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
            <GradientText
              text={`${userName}!`}
              textStyle={{
                fontSize: width > iPhoneX ? 32 : 24,
                fontFamily: "BaiJamjuree-Bold",
                textTransform: "capitalize",
                fontWeight: "900",
                color: "white",
              }}
              colors={["#75E0DF", "#7B8DE3"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
          </View>
        </View>
      )}
    </JoinBoatWrapper>
  );
};

export default EnterName;
