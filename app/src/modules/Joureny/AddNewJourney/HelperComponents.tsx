import { editLogo } from "@constants/imageKitURL";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const EditImage = () => {
  return (
    <View className="flex flex-row justify-center items-center px-2 py-1 bg-[#262630]/50 border border-white rounded-full">
      <Text
        className="text-white text-sm iphoneX:text-base px-2"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Edit Image
      </Text>
      <Image
        source={{ uri: editLogo }}
        className="w-3 iphoneX:w-4 aspect-square"
        resizeMode="contain"
      />
    </View>
  );
};

interface EditWeightProps {
  text: string;
  onPress: () => void;
}

export const EditWeight: React.FC<EditWeightProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full rounded-xl border border-white flex flex-row justify-center items-center p-3"
    >
      <Text
        className="text-white text-xl iphoneX:text-2xl px-3"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {text}
      </Text>
      <Image
        source={{ uri: editLogo }}
        className="w-4 iphoneX:w-5 aspect-square"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

interface CTAProps {
  iconUrl: string;
  text: string;
}

export const CTA: React.FC<CTAProps> = ({ iconUrl, text }) => {
  return (
    <View className="bg-[#262630] w-full px-6 py-4 rounded-2xl flex flex-row justify-center items-center">
      <Image
        source={{ uri: iconUrl }}
        className="w-1/6 aspect-square"
        resizeMode="contain"
      />
      <View className="w-4 aspect-square" />
      <Text
        className="flex-1 text-white text-base iphoneX:text-lg"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {text}
      </Text>
    </View>
  );
};

interface NextBtnProps {
  onDone?: () => void;
  onSave?: () => void;
  JourneyId?: string;
}

export const NextBtn: React.FC<NextBtnProps> = ({
  onDone,
  onSave,
  JourneyId,
}) => {
  const handlePress = () => {
    if (onDone) {
      onDone();
    } else if (onSave) {
      onSave();
    }
  };

  return onDone || onSave ? (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full py-3 m-4 bg-white rounded-full"
    >
      <Text
        className="text-[#100F1A] text-base text-center iphoneX:text-lg"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {onDone
          ? "Done"
          : onSave
          ? JourneyId
            ? "Update Journey"
            : "Save Journey"
          : ""}
      </Text>
    </TouchableOpacity>
  ) : null;
};
