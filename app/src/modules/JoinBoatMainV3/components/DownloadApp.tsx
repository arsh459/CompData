import GradientText from "@components/GradientText";
import {
  consultationIcon,
  fitnesTipsIcon,
  socialboatSakhiLogoColor2,
  workoutIcon,
} from "@constants/imageKitURL";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LocalUser } from "../interface/localuser";

const whatYouGet: { text: string; icon: string }[] = [
  { text: "1000+ Health and fitness tips", icon: fitnesTipsIcon },
  { text: "Free Workout plan powered by AI", icon: workoutIcon },
  {
    text: "Free Health Consultation will be given ",
    icon: consultationIcon,
  },
];

interface Props {
  localUser: LocalUser | undefined;
  gotoHome: () => void;
}
const DownloadApp: React.FC<Props> = ({ localUser, gotoHome }) => {
  const onStart = () => {
    weEventTrack(`fScanDownload_clickDownloadApp`, {});
    gotoHome();
  };

  return (
    <View className="flex-1 flex flex-col p-4">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 relative z-0"
      >
        <View className="flex flex-row items-center">
          <Image
            source={{ uri: socialboatSakhiLogoColor2 }}
            className="w-1/3 max-w-xs aspect-square object-contain"
          />
          <View className="flex-1 px-2">
            <GradientText
              text={`Congratulations ${localUser?.name}, Your Free Plan is Ready! Download the app to claim`}
              colors={["#75E0DF", "#7B8DE3"]}
              textStyle={{
                fontSize: 20,
                fontWeight: "700",
              }}
            />
          </View>
        </View>

        <View className="flex-1">
          <Text className="text-white p-4 text-lg">What you will get:</Text>
          {whatYouGet.map((item, index) => (
            <LinearGradient
              colors={["#88FAFF", "#6D8EFF"]}
              key={item.text}
              className={clsx(
                "rounded-2xl p-px",
                index !== whatYouGet.length - 1 && "mb-4"
              )}
            >
              <View className="bg-[#100F1A] rounded-2xl w-full p-3 flex flex-row items-center">
                <Image
                  source={{ uri: item.icon }}
                  className="w-8 iphoneX:w-10 aspect-square mr-3"
                />
                <Text className="text-white/80 text-sm">{item.text}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="w-full rounded-full overflow-hidden"
        onPress={onStart}
      >
        <LinearGradient colors={["#88FAFF", "#6D8EFF"]} className="px-4 py-3">
          <Text className="text-black font-bold text-base text-center">
            Start
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadApp;
