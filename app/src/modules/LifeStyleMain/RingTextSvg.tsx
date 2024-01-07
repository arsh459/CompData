import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Text,
  G,
} from "react-native-svg";

interface Props {
  ringCount: number;
}

const RingTextSvgIcon: React.FC<Props> = ({ ringCount }) => {
  return (
    <Svg className="w-full h-full " viewBox="0 0 309 300" fill="none">
      <Text
        x="50%"
        y="55%"
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize={160}
        fontWeight={700}
        fontFamily="Nunito-Bold"
        fill="url(#prefix__paint0_linear_11156_1713)"
      >
        {ringCount}
      </Text>
      {ringCount >= 1 ? (
        <G>
          <Mask id="prefix__a" fill="#fff">
            <Path d="M67 150a83 83 0 01166 0H67z" />
          </Mask>
          <Path
            d="M67 150a83 83 0 01166 0H67z"
            stroke="url(#prefix__paint1_linear_11156_1713)"
            strokeWidth={4}
            mask="url(#prefix__a)"
          />
        </G>
      ) : null}
      {ringCount >= 2 ? (
        <G>
          <Mask id="prefix__b" fill="#fff">
            <Path d="M42 150a108 108 0 01216 0H42z" />
          </Mask>
          <Path
            d="M42 150a108 108 0 01216 0H42z"
            stroke="url(#prefix__paint2_linear_11156_1713)"
            strokeWidth={2}
            mask="url(#prefix__b)"
          />
        </G>
      ) : null}
      {ringCount >= 3 ? (
        <G>
          <Mask id="prefix__c" fill="#fff">
            <Path d="M21 150A128.998 128.998 0 01199.366 30.82a129.006 129.006 0 0169.814 69.814A128.995 128.995 0 01279 150H21z" />
          </Mask>
          <Path
            d="M21 150A128.998 128.998 0 01199.366 30.82a129.006 129.006 0 0169.814 69.814A128.995 128.995 0 01279 150H21z"
            stroke="url(#prefix__paint3_linear_11156_1713)"
            mask="url(#prefix__c)"
          />
        </G>
      ) : null}
      {ringCount >= 4 ? (
        <G>
          <Mask id="prefix__d" fill="#fff">
            <Path d="M0 150a150 150 0 11300 0H0z" />
          </Mask>
          <Path
            d="M0 150a150 150 0 11300 0H0z"
            stroke="url(#prefix__paint4_linear_11156_1713)"
            mask="url(#prefix__d)"
          />
        </G>
      ) : null}
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_11156_1713"
          x1={150.5}
          y1={101}
          x2={150.5}
          y2={222}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7653FF" />
          <Stop offset={1} stopColor="#E153FF" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear_11156_1713"
          x1={150}
          y1={67}
          x2={150}
          y2={150}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7352FF" />
          <Stop offset={0.784} stopColor="#E152FF" />
          <Stop offset={0.942} stopColor="#FC52FF" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear_11156_1713"
          x1={150}
          y1={42}
          x2={150}
          y2={150}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7352FF" />
          <Stop offset={0.782} stopColor="#E852FF" />
          <Stop offset={0.989} stopColor="#FC52FF" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear_11156_1713"
          x1={150}
          y1={21}
          x2={150}
          y2={150}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7352FF" />
          <Stop offset={0.651} stopColor="#E452FF" />
          <Stop offset={1} stopColor="#FC52FF" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear_11156_1713"
          x1={150}
          y1={0}
          x2={150}
          y2={150}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7352FF" />
          <Stop offset={0.651} stopColor="#E452FF" />
          <Stop offset={1} stopColor="#FC52FF" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default RingTextSvgIcon;
