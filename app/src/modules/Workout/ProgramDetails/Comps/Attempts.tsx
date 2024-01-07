import { View, Text, useWindowDimensions } from "react-native";
import HexaPercent from "@components/HexaPercent";
import FastImage from "react-native-fast-image";
import { Activity } from "@models/Activity/Activity";
import { calculateFPFromCalories } from "@providers/task/hooks/useTaskStream";
import { format } from "date-fns";

interface Props {
  activity: Activity;
  taskFP: number;
  index: number;
  total: number;
}

const Attempts: React.FC<Props> = ({ activity, taskFP, index, total }) => {
  const { width } = useWindowDimensions();
  const fpAward = calculateFPFromCalories(activity.calories);
  const visibleProgress = activity.fpProgress || fpAward / taskFP;

  return (
    <View
      className="flex-1 flex flex-row justify-between items-center bg-[#524C84] rounded-2xl p-4"
      style={{ marginTop: index === 0 ? 0 : 16 }}
    >
      <View className="flex justify-center items-center">
        <Text
          className="text-sm text-white"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {format(activity.updatedOn, "do LLLL")}
        </Text>
        <Text
          className="text-xs text-white/80"
          style={{ fontFamily: "Nunito-Bold" }}
        >{`${total - index} attempt`}</Text>
      </View>

      <View className="flex flex-row justify-between items-center">
        <HexaPercent
          width={width * 0.12}
          height={width * 0.12}
          percent={visibleProgress}
          activeColor={"#fff"}
          inActiveColor={"#00000033"}
        >
          <View className="w-full h-full flex justify-center items-center">
            <FastImage
              source={{
                uri: `https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Frame_1432_mILSIgxCi.png?updatedAt=1680331692444`,
              }}
              className="w-1/2 aspect-square"
            />
          </View>
        </HexaPercent>

        <Text
          className="text-3xl text-white ml-3"
          style={{ fontFamily: "Nunito-Bold" }}
        >{`${fpAward}/${taskFP}`}</Text>
      </View>
    </View>
  );
};

export default Attempts;
