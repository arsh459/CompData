import { Video } from "expo-av";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

interface Props {
  videoUrl?: string;
  imageUrl?: string;
  onPress: () => void;
  text?: string;
  cta?: string;
  children?: React.ReactNode;
}

const CameraPermission: React.FC<Props> = ({
  videoUrl,
  imageUrl,
  text,
  onPress,
  cta,
  children,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View className="w-full flex-1 flex justify-center items-center px-4">
      <View className="flex-1 flex justify-center items-center">
        <View
          className="flex-1 aspect-square"
          style={{ maxHeight: width - 32 }}
        >
          {videoUrl ? (
            <Video
              shouldPlay={true}
              isMuted={true}
              isLooping={false}
              useNativeControls={false}
              source={{ uri: videoUrl }}
              className="w-full h-full"
            />
          ) : (
            <Image
              source={{
                uri: imageUrl
                  ? imageUrl
                  : "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_92_BpvSzkIu8.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671195465410",
              }}
              className="w-full h-full"
            />
          )}
        </View>
        {children ? children : null}
        {text ? (
          <Text
            className="text-white text-base py-1"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {text}
          </Text>
        ) : null}
      </View>
      {cta ? (
        <TouchableOpacity
          onPress={onPress}
          className="w-full bg-white rounded-full py-3 my-4"
        >
          <Text
            className="text-[#100F1A] text-xl text-center"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {cta ? cta : "Grant Access"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CameraPermission;

interface CameraPermissionContentProps {
  text: string;
}

export const CameraPermissionContent: React.FC<
  CameraPermissionContentProps
> = ({ text }) => {
  return (
    <>
      <Text
        className="text-white text-base py-1"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        We require your {text} Access to help the AI count your
        <Text className="font-bold"> reps</Text>, offer you
        <Text className="font-bold"> posture correction </Text>tips and reward
        <Text className="font-bold"> FitPoints</Text>.
      </Text>
      <Text
        className="text-white text-base py-1"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        Be rest assured, we
        <Text className="font-bold"> do not record or store </Text>any content
        of yours, neither does anyone watch this. We respect your privacy and
        seek this permission to help you workout better.
      </Text>
    </>
  );
};
