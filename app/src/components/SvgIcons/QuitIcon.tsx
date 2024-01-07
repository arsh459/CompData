import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const QuitIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 16 20" fill="none">
      <Path
        d="M16 10a1 1 0 01-1 1H7.41l2.3 2.29a1 1 0 01-.325 1.639 1 1 0 01-1.095-.219l-4-4a1 1 0 01-.21-.33 1 1 0 010-.76 1 1 0 01.21-.33l4-4a1.004 1.004 0 111.42 1.42L7.41 9H15a1 1 0 011 1zM3 0h10a3 3 0 013 3v3a1 1 0 01-2 0V3a1 1 0 00-1-1H3a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 012 0v3a3 3 0 01-3 3H3a3 3 0 01-3-3V3a3 3 0 013-3z"
        fill={color ? color : "#F5F8FF"}
      />
    </Svg>
  );
};

export default QuitIcon;
