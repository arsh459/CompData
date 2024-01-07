import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
export const TeamIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.5 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm5 .5a2 2 0 11-4 0 2 2 0 014 0zm-13 2a2 2 0 100-4 2 2 0 000 4zM4 7.25C4 6.56 4.56 6 5.25 6h5.5c.69 0 1.25.56 1.25 1.25V12a4 4 0 11-8 0V7.25zm-1 0c0-.463.14-.892.379-1.25H1.25C.56 6 0 6.56 0 7.25V11a3 3 0 003.404 2.973A4.983 4.983 0 013 12V7.25zM13 12c0 .7-.144 1.368-.404 1.973A3 3 0 0016 11V7.25C16 6.56 15.44 6 14.75 6h-2.129c.24.358.379.787.379 1.25V12z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default TeamIcon;
