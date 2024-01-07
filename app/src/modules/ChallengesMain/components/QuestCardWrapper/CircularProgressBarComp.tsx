import CircularProgress from "react-native-circular-progress-indicator";

interface Props {
  valueInPercent: number;
  radiusOfCircle?: number;
  text: string;
  ActiveColor?: string;
  inActiveColor?: string;
  activeStrokeWidth?: number;
  inActiveStrokeWidth?: number;
  textStyle?: { [ingKey: string]: string };
}
const CircularProgressBarComp: React.FC<Props> = ({
  valueInPercent,
  radiusOfCircle,
  text,
  ActiveColor,
  inActiveColor,
  activeStrokeWidth,
  inActiveStrokeWidth,
  textStyle = {},
}) => {
  return (
    <CircularProgress
      value={valueInPercent}
      radius={radiusOfCircle}
      progressFormatter={(value: number) => {
        "worklet";
        return text;
      }}
      duration={0}
      initialValue={0}
      activeStrokeColor={ActiveColor}
      inActiveStrokeColor={inActiveColor}
      activeStrokeWidth={activeStrokeWidth}
      inActiveStrokeWidth={inActiveStrokeWidth}
      // progressValueColor={"#ffffffcc"}
      maxValue={100}
      progressValueStyle={{
        fontFamily: "Nunito-Light",
        fontWeight: "500",
        fontSize: 9,
        color: "#ffffffcc",
        ...textStyle,
      }}
    />
  );
};

export default CircularProgressBarComp;
