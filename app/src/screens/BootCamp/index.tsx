import Loading from "@components/loading/Loading";

import { useBootcampInvite } from "@hooks/bootcamp/useBootcampUserInvite";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import BootCampMain from "@modules/BootCampMain";
import { useBootcampContext } from "@providers/bootcamp/BootcampProvider";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export interface BootCampParams {
  id: string;
}

const BootCamp = () => {
  const route = useRoute();
  const params = route.params as BootCampParams | undefined;

  const { bootcamp, loading, start, end } = useBootcampContext();
  useBootcampInvite(params?.id);
  useScreenTrack();

  return (
    <LinearGradient
      colors={[
        "#2A0E6B",
        "#2A0E6B",
        "#6825B4",
        "#A048D4",
        "#E36BFF",
        "#F3BBF3",
      ]}
      className="flex-1"
    >
      {bootcamp && !loading ? (
        <BootCampMain bootcamp={bootcamp} start={start} end={end} />
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      )}
    </LinearGradient>
  );
};

export default BootCamp;
