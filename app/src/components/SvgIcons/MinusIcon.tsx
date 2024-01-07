import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const MinusIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 52.161 52.161" fill="none">
      <Path
        d="M52.161 26.081a5.874 5.874 0 0 1-5.875 5.875H5.875a5.875 5.875 0 1 1 0-11.75h40.411a5.874 5.874 0 0 1 5.875 5.875z"
        fill={color ? color : "#35325A"}
      />
    </Svg>
  );
};

export default MinusIcon;
