import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  fill?: boolean;
}

const ReplyIcon: React.FC<Props> = ({ color, fill }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.499 20.748a1.25 1.25 0 01-.498-.998V17H5.25A3.25 3.25 0 012 13.75v-8.5A3.25 3.25 0 015.25 2h13.5A3.25 3.25 0 0122 5.25v8.5A3.25 3.25 0 0118.75 17h-5.738L8 20.75a1.25 1.25 0 01-1.501-.002z"
        fill={fill ? color || "#FFFFF" : "#00000000"}
        stroke={color || "#FFFFF"}
        strokeWidth={1}
      />
    </Svg>
  );
};

export default ReplyIcon;
