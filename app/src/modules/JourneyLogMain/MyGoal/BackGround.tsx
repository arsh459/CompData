import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface Props {
  color: [string, string];
}

const Background: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full aspect-[388/142]" viewBox="0 0 388 142" fill="none">
      <Path fill="url(#prefix__paint0_linear_11515_1732)" d="M0 0h388v142H0z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 53l16.167 6.357L97 91.143c32.333 12.714 64.667 25.428 97 31.786 32.333 6.357 64.667 6.357 97 2.119 32.333-4.238 64.667-12.715 80.833-16.953L388 103.857V142H0V53z"
        fill="url(#prefix__paint1_linear_11515_1732)"
        fillOpacity={0.3}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M388 15l-16.167 9.071L291 69.43c-32.333 18.142-64.667 36.285-97 45.357-32.333 9.071-64.667 9.071-97 3.024-32.333-6.048-64.667-18.143-80.833-24.19L0 87.57V142h388V15z"
        fill="#fff"
        fillOpacity={0.4}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_11515_1732"
          x1={194}
          y1={0}
          x2={194}
          y2={142}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color[0]} />
          <Stop offset={1} stopColor={color[1]} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear_11515_1732"
          x1={6}
          y1={31.5}
          x2={194}
          y2={142}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.668} stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Background;
