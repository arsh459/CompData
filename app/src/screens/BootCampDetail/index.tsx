import Loading from "@components/loading/Loading";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import BootCampDetailMain from "@modules/BootCampDetailMain/BootCampDetailMain";
import { useBootcampContext } from "@providers/bootcamp/BootcampProvider";
import { View } from "react-native";

const BootCampDetail = () => {
  const { bootcamp, loading, start, end } = useBootcampContext();
  useScreenTrack();

  return (
    <View className="flex-1 bg-[#232136]">
      {bootcamp && !loading ? (
        <BootCampDetailMain bootcamp={bootcamp} start={start} end={end} />
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <Loading />
        </View>
      )}
    </View>
  );
};

export default BootCampDetail;
