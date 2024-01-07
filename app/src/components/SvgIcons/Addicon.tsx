import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const AddIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 27 27" fill="none">
      <Path
        d="M13.5 26V13.5m0 0V1m0 12.5H26m-12.5 0H1"
        stroke={color ? color : "#FFF"}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default AddIcon;
