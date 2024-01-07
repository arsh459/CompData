import ImageWithURL from "@components/ImageWithURL";
import useDietPlanStage from "@modules/Nutrition/store/useDietPlanStage";
import { View, Text, TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";
import LineIconV1 from "../PlanList/LineIconV1";
import LineIconV2 from "../PlanList/LineIconV2";
interface Props {
  title: string;
  onNext: () => void;
}
const StageCardContentCta: React.FC<Props> = ({ title, onNext }) => {
  const { planStage } = useDietPlanStage(
    (state) => ({ planStage: state.planStage }),
    shallow
  );
  return (
    <View className="flex flex-1 h-full items-start justify-between ">
      <View className="flex items-start justify-center pt-3">
        <Text
          className="text-white iphoneX:text-base text-sm"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {title}
        </Text>
        {planStage === "notSubscribed" && (
          <View className=" w-[70%] flex items-start justify-start">
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Group%201000001439_4NHb7E0fP.png?updatedAt=1701263693651",
              }}
              resizeMode={"contain"}
              className={"w-full aspect-[68/5]"}
            />
          </View>
        )}

        {planStage === "subscribedFormNotFilled" && (
          <>
            <View className="flex">
              <View className="h-[5px] aspect-[68/5]">
                <LineIconV1 color={"#FF7940"} />
              </View>
            </View>
            <View className="flex">
              <View className="h-[3px] aspect-[68/5]">
                <LineIconV2 color={"#FF7940"} />
              </View>
            </View>
          </>
        )}
      </View>
      <View className="flex-1 flex items-center justify-end pb-3">
        <TouchableOpacity
          className="flex items-center justify-center rounded-lg bg-[#FFF]"
          onPress={onNext}
        >
          <Text
            className="py-2.5 px-6 text-center  text-xs "
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Let’s Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StageCardContentCta;
