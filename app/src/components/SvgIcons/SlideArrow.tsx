import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface Props {
  color?: string;
}

const SlidingArrowIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full relative z-0"
      viewBox="0 0 370 68"
      fill="none"
    >
      <Path
        d="M317 0h29.121L370 34l-23.879 34H317l20.385-34L317 0z"
        fill="#6D55D1"
      />
      <Path
        d="M313 2h28.022L364 34l-22.978 32H313l19.615-32L313 2z"
        fill="#AE9BFC"
      />
      <Path fill="url(#prefix__paint0_linear_35_21)" d="M0 5h334v58H0z" />
      <Path d="M311 5h25l20.5 29L336 63h-25l17.5-29L311 5z" fill="#CCBFFF" />

      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_35_21"
          x1={334}
          y1={20.708}
          x2={0}
          y2={20.708}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6C49FF" />
          <Stop offset={1} stopColor="#6C49FF" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SlidingArrowIcon;
