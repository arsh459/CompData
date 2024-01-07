import ImageWithURL from "@components/ImageWithURL";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useChatVoicePremissionStore } from "@providers/chat/store/useChatVoicePermissionStore";
import { requestMicPermission } from "@providers/chat/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { openSettings } from "react-native-permissions";

const VoicePermissionRequest = () => {
  const {
    storagePermissionGranted,
    permissionStatusVoice,
    setPermissionStausVoice,
  } = useChatVoicePremissionStore((state) => ({
    storagePermissionGranted: state.storagePermissionGranted,
    permissionStatusVoice: state.premissionStatusVoice,
    setPermissionStausVoice: state.setPremissionStatusVoice,
  }));

  const requestHandler = async () => {
    const permStatus = await requestMicPermission();
    setPermissionStausVoice(permStatus);

    weEventTrack("requestAudioPermission", {});
  };
  return (
    <View className="flex-1 relative flex px-4 pb-8">
      {/* ******** Background********* */}
      <LinearGradient
        colors={["#232136", "#1A1360", "#2A2087"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute left-0 right-0 top-0 bottom-0"
      />
      <View className=" flex-1 flex items-center justify-between w-full pt-10 mb-8">
        <ImageWithURL
          className="w-full h-20"
          resizeMode="contain"
          source={{
            uri: "https://ik.imagekit.io/socialboat/micAccess_UGsRehTJmY.png?updatedAt=1701689047051",
          }}
        />
        <ImageWithURL
          className=" w-2/3 aspect-square mt-10"
          resizeMode="contain"
          source={{
            uri: "https://ik.imagekit.io/socialboat/micGrandient_90oZEjEaZ.png?updatedAt=1701689113595",
          }}
        />
        <Text className="text-lg text-white">Allow Microphone Permisions</Text>
        <Text className="text-base text-white/50 text-center">
          Please give access to your microphone to use this functionality
        </Text>
      </View>
      {permissionStatusVoice === "blocked" || !storagePermissionGranted ? (
        <ClickButton
          onNext={() => openSettings()}
          nextBtnText="Go to Settings"
        />
      ) : (
        <ClickButton onNext={requestHandler} nextBtnText="Allow Permission" />
      )}
    </View>
  );
};

export default VoicePermissionRequest;
