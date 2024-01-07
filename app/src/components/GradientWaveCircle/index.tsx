import clsx from "clsx";
import { View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

interface Props {
  children?: React.ReactNode;
  className?: string;
  color1?: string;
  color2?: string;
}

const GradientWaveCircle: React.FC<Props> = ({
  children,
  className,
  color1,
  color2,
}) => {
  return (
    <View
      className={clsx("relative", className ? className : "w-8 aspect-square")}
    >
      <Svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
        <Circle cx={18} cy={18} r={14} fill="#fff" fillOpacity={0.09} />
        <Circle
          cx={18}
          cy={18}
          r={13.75}
          stroke="url(#prefix__paint0_linear_424_8)"
          strokeWidth={0.5}
        />
        <Circle
          cx={18}
          cy={18}
          r={15.85}
          stroke="url(#prefix__paint1_linear_424_8)"
          strokeWidth={0.3}
        />
        <Circle
          cx={18}
          cy={18}
          r={17.95}
          stroke="url(#prefix__paint2_linear_424_8)"
          strokeWidth={0.1}
        />
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear_424_8"
            x1={18}
            y1={4}
            x2={18}
            y2={32}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color1 ? color1 : "#FFFFFF"} />
            <Stop offset={1} stopColor={color2 ? color2 : "#FFFFFF"} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_424_8"
            x1={18}
            y1={2}
            x2={18}
            y2={34}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color1 ? color1 : "#FFFFFF"} />
            <Stop offset={1} stopColor={color2 ? color2 : "#FFFFFF"} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint2_linear_424_8"
            x1={18}
            y1={0}
            x2={18}
            y2={36}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color1 ? color1 : "#FFFFFF"} />
            <Stop offset={1} stopColor={color2 ? color2 : "#FFFFFF"} />
          </LinearGradient>
        </Defs>
      </Svg>
      <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        {children}
      </View>
    </View>
  );
};

export default GradientWaveCircle;
