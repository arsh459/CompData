import { View, Dimensions } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const { width } = Dimensions.get("window");

const SkeletonInsight = () => {
  // const { insightsToShow, loading } = useSakhiInsights();

  return (
    <View className="rounded-xl">
      <SkeletonPlaceholder
        backgroundColor="#FFFFFF33"
        speed={800}
        highlightColor="#00000033"
        borderRadius={20}
      >
        <View
          className="rounded-xl mr-4"
          style={{
            width: width / 1.8,
            height: width / 3,

            backgroundColor: "#000",
          }}
        />
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonInsight;
