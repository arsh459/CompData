import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
interface Props {
  startColor?: string;
  endColor?: string;
}

const WorkOutSvgIcon: React.FC<Props> = ({ startColor, endColor }) => {
  return (
    <Svg className="w-full h-full " viewBox="0 0 85 96" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.196 2.737V48.35c0 4.241-2.922 10.43-5.872 16.68-2.76 5.849-5.547 11.751-5.988 16.161-.73 7.298 3.953 5.474 6.386 3.65l14.596-29.193 1.825-3.65h18.245c2.19 0 3.345 1.217 3.65 1.826 3.344 9.426 10.581 29.557 12.77 34.665 2.737 6.386 4.562 6.386 7.299 6.386 2.19 0 2.128-4.257 1.824-6.386-2.128-9.122-6.933-30.287-9.122-41.964-2.19-11.677-10.035-14.596-13.684-14.596h-20.07c-1.46 0-1.825-.608-1.825-.912-.912-9.123-2.736-27.55-2.736-28.28 0-.912-.913-2.737-3.65-2.737-2.189 0-3.344 1.825-3.648 2.737zM21.894 40.14c0 6.045-4.9 10.947-10.947 10.947C4.901 51.087 0 46.185 0 40.14c0-6.046 4.901-10.948 10.947-10.948 6.046 0 10.947 4.902 10.947 10.948zM45.616 59.3h11.86l-9.123 33.753c-.912 3.65-7.298 4.744-7.298-1.824 0-6.569 3.041-24.023 4.561-31.93z"
        fill="url(#prefix__paint0_linear_3075_608)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_3075_608"
          x1={42.043}
          y1={0}
          x2={42.043}
          y2={95.977}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={startColor ? startColor : "#A5DAFF"} />
          <Stop offset={1} stopColor={endColor ? endColor : "#DBF0FF"} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default WorkOutSvgIcon;
