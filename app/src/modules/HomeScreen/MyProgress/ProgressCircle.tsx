import { Text } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";

interface Props {
  // middleText?: string;
  goal: number;
  achieved: number;
  bottomText?: string;
  radius: number;
  // percent: number;
}
const ProgressCircle: React.FC<Props> = ({
  goal,
  achieved,
  bottomText,
  radius,
  // percent,
}) => {
  // const { width: Width } = useWindowDimensions();

  const progressFormatter = (value: number) => {
    "worklet";
    return Math.round(achieved);
    // return Math.round((value * goal) / 100);
  };

  const percent = achieved > goal ? goal : achieved;
  return (
    <>
      <CircularProgress
        value={percent}
        radius={radius}
        progressFormatter={progressFormatter}
        // showProgressValue={false}
        // valuePrefix={`${achieved}`}
        valueSuffix={`/${goal}`}
        maxValue={goal ? goal : 1}
        progressValueStyle={{
          fontFamily: "BaiJamjuree-Bold",
          fontSize: 18,
        }}
        valueSuffixStyle={{ fontFamily: "BaiJamjuree-Bold", fontSize: 18 }}
        // valuePrefixStyle={{ fontFamily: "BaiJamjuree-Bold", fontSize: 18 }}
        activeStrokeColor="#000"
        inActiveStrokeColor="rgba(255, 255, 255, 0.3)"
      ></CircularProgress>

      {/* <CirclePercent
        circleSize={Width * 0.24}
        percent={percent}
        activeColor={"#FFFFFF"}
        strokeWidth={8}
        padding={2}
        inActiveColor="#FFFFFF4D"
        showInactive={true}
      >
        <View className="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-base"
          >
            {middleText}
          </Text>
        </View>
      </CirclePercent> */}
      <Text
        className="text-[#F1F1F1] text-xs pt-1"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {bottomText}
      </Text>
    </>
  );
};

export default ProgressCircle;
