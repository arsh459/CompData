import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface Props {
  color?: string;
}

const JourneyIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
      <Path
        d="M20 17.143a2.857 2.857 0 01-5.714 0V2.857a2.857 2.857 0 015.714 0v14.286zm-7.143 0a2.857 2.857 0 11-5.714 0V9.01a2.857 2.857 0 115.714 0v8.132zm-7.143 0a2.857 2.857 0 01-5.714 0v-3.517a2.857 2.857 0 115.714 0v3.517z"
        fill={color ? color : "url(#prefix__paint0_linear_4049_702)"}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_4049_702"
          x1={0}
          y1={17}
          x2={22}
          y2={3}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#4D5AFF" />
          <Stop offset={1} stopColor="#FF45F8" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default JourneyIcon;
