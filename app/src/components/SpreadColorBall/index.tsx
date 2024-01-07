import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

interface Props {
  color1?: string;
  color2?: string;
  opacity?: number;
  opacity1?: number;
  opacity2?: number;
}

const SpreadColorBall: React.FC<Props> = ({
  color1,
  color2,
  opacity,
  opacity1,
  opacity2,
}) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      opacity={opacity}
    >
      <Circle fill="url(#RadialGradient)" cx={50} cy={50} r={50} />
      <Defs>
        <RadialGradient id={"RadialGradient"}>
          <Stop
            offset="0"
            stopColor={color1 ? color1 : "#FFFFFF"}
            stopOpacity={opacity1}
          />
          <Stop
            offset="1"
            stopColor={color2 ? color2 : "#FFFFFF"}
            stopOpacity={opacity2}
          />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default SpreadColorBall;
