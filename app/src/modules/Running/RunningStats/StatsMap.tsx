// import { bottomRunnigStaticImage } from "@constants/imageKitURL";
// import { useLocation } from "@hooks/steps/useLocation";
import StepsPath from "@modules/StepsPath";
import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
import { useIsPlayServices } from "@providers/GoogleFit/hooks/useIsPlayServices";

import { View, SafeAreaView } from "react-native";

interface Props {
  children?: React.ReactNode;
}

const StatsMap: React.FC<Props> = ({ children }) => {
  // const { coords } = useLocation();
  const { playServicesStatus, requestPlayServices } = useIsPlayServices();

  return (
    <SafeAreaView className="flex-1 bg-[#100F1A]">
      <View
        className="absolute left-0 right-0 top-0 "
        style={{ aspectRatio: 0.7 }}
      >
        {playServicesStatus === "ABSENT" ? (
          <View className="bg-[#100F1A] flex-1">
            <RequestPermission
              text="To view the maps, you need to add Play Services"
              onPress={requestPlayServices}
              cta="Get Play Services"
            />
          </View>
        ) : (
          <StepsPath aspectRatio={375 / 408} />
        )}
      </View>
      <View className="flex-1" />
      {children}
      {/* <View className="px-4  py-12 iphoneX:pb-2">
        <Image
          source={{ uri: bottomRunnigStaticImage }}
          resizeMode="contain"
          className="w-full h-32 "
        />
      </View> */}
    </SafeAreaView>
  );
};

export default StatsMap;
