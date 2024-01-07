import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const HamMenuIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 23 19" fill="none">
      <Path
        d="M1 1h21M1 18h21H1zm0-8.5h21H1z"
        stroke={color ? color : "#FFF"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HamMenuIcon;
