import { Path, Svg } from "react-native-svg";

interface Props {
  color?: string;
}
const BlockIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M500 250c0 138.07-111.93 250-250 250S0 388.07 0 250 111.93 0 250 0s250 111.93 250 250zM350.113 399.613C321.488 418.807 287.051 430 250 430c-99.41 0-180-80.588-180-180 0-37.053 11.195-71.49 30.387-100.115l249.726 249.728zm49.496-49.496L149.883 100.389C178.508 81.195 212.949 70 250 70c99.41 0 180 80.588 180 180 0 37.053-11.199 71.492-30.391 100.117z"
        fill={color || "#FFFFFF"}
      />
    </Svg>
  );
};

export default BlockIcon;
