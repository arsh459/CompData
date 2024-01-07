import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
export const TimeIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 9 9" fill="none">
      <Path
        d="M3.379 0a.32.32 0 00-.32.321.322.322 0 00.32.322h1.919a.32.32 0 00.32-.322.322.322 0 00-.32-.321h-1.92zm4.797 5.143C8.176 7.273 6.458 9 4.338 9S.5 7.273.5 5.143s1.719-3.857 3.838-3.857c2.12 0 3.838 1.727 3.838 3.857zM4.658 3.214a.322.322 0 00-.32-.321.319.319 0 00-.32.321v1.929a.322.322 0 00.32.321.32.32 0 00.32-.321V3.214zM7.31 1.38a.319.319 0 01.453 0l.64.643a.322.322 0 01-.35.526.32.32 0 01-.103-.072l-.64-.643a.322.322 0 010-.454z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default TimeIcon;
