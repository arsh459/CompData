import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
export const DownDoubleArrowIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="h-full w-full"
      viewBox="0 0 20 20"
      fill={color ? color : "#FF517B"}
    >
      <Path
        fillRule="evenodd"
        d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default DownDoubleArrowIcon;
