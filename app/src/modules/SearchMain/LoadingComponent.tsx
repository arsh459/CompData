import { View } from "react-native";
import Loading from "@components/loading/Loading";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";

const LoadingComponent = () => {
  const fetching = useAlgoliaStore((state) => state.action === "fetching");

  return fetching ? (
    <View
      pointerEvents="none"
      className="absolute left-0 right-0 top-0 bottom-0 z-10 flex justify-center items-center bg-[#232136]"
    >
      <Loading width="w-10 iphoneX:w-12" height="h-10 iphoneX:h-12" />
    </View>
  ) : null;
};

export default LoadingComponent;
