import ImageWithURL from "@components/ImageWithURL";
import { MealCardBottom, MealCardHemiSphere } from "@constants/imageKitURL";
import { View } from "react-native";

interface Props {}
const PlanListFooterImages: React.FC<Props> = ({}) => {
  return (
    <>
      <View className="w-full absolute bottom-0 left-0 right-0 z-10">
        <View>
          <ImageWithURL
            source={{ uri: MealCardBottom }}
            resizeMode={"contain"}
            className={"aspect-[293/99]"}
          />
        </View>
      </View>
      <View className="h-full absolute bottom-0 left-0 right-0 z-0">
        <View>
          <ImageWithURL
            source={{ uri: MealCardHemiSphere }}
            resizeMode={"contain"}
            className={"aspect-[283/187]"}
          />
        </View>
      </View>
    </>
  );
};

export default PlanListFooterImages;
