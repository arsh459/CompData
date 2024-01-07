import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  fill?: boolean;
}

const HeartIcon: React.FC<Props> = ({ color, fill }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.938 3a5.966 5.966 0 00-3.299.994A5.907 5.907 0 001.452 6.64a5.862 5.862 0 00-.338 3.408 5.886 5.886 0 001.625 3.02l8.774 8.716a.734.734 0 00.803.16c.09-.038.17-.092.239-.16l8.774-8.717A5.877 5.877 0 0023 8.918a5.88 5.88 0 00-1.738-4.123 5.958 5.958 0 00-4.15-1.727 5.959 5.959 0 00-4.178 1.66l-.899.89-.897-.89A5.965 5.965 0 006.938 3z"
        fill={fill ? color || "#FFFFF" : "#00000000"}
        stroke={color || "#FFFFF"}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default HeartIcon;
