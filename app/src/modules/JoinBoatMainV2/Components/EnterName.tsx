import GradientText from "@components/GradientText";
import { socialboatSakhiLogoColor2 } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { LocalUser } from "@hooks/user/useLocalUserV2";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useState } from "react";
import {
  View,
  TextInput,
  Image,
  useWindowDimensions,
  Platform,
  // Platform,
} from "react-native";
import JoinBoatWrapper from "../JoinBoatWrapper";

interface Props {
  localUser?: LocalUser | undefined;
  onNameUpdate: (val: string) => void;
  onNameNext: () => void;
  backOnDone?: boolean;
}

const EnterName: React.FC<Props> = ({
  localUser,
  onNameUpdate,
  onNameNext,
  backOnDone,
}) => {
  const { width } = useWindowDimensions();
  const [isNextClicked, setIsNextClicked] = useState<boolean>(false);

  const onNext = () => {
    if (localUser?.name?.trim()) {
      setIsNextClicked(true);

      setTimeout(() => {
        setTimeout(() => {
          setIsNextClicked(false);
        }, 1000);
        onNameNext();
      }, 2000);
    } else {
      onNameNext();
    }
  };

  return (
    <JoinBoatWrapper
      headText="Introduction"
      title={
        isNextClicked
          ? ""
          : Platform.OS === "ios"
          ? "What will be your SB Username?"
          : "Let's start with your name"
      }
      current={1}
      onNext={isNextClicked ? undefined : onNext}
      backOnDone={backOnDone}
      disabled={!localUser?.name?.trim()}
    >
      {!isNextClicked ? (
        <View className="p-4">
          <TextInput
            className="w-3/4 mx-auto px-4 text-white text-3xl iphoneX:text-4xl text-center border-b border-[#757575]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            value={localUser?.name ? localUser?.name : ""}
            onChangeText={(text: string) => onNameUpdate(text)}
            placeholder="Meera"
            placeholderTextColor="#75757580"
            blurOnSubmit
          />
        </View>
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <View className="flex flex-row justify-center items-center">
            <Image
              source={{ uri: socialboatSakhiLogoColor2 }}
              className="w-2/3 max-w-xs aspect-square"
              resizeMode="contain"
            />
          </View>
          <View className="w-3/4 flex justify-center items-center mx-auto py-4">
            <GradientText
              text="Nice to meet you"
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
              text={`${localUser?.name}!`}
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
