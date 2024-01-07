import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const DoneIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 19 19" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0zm8.958 4.066l5.47-6.837-.989-.79-4.664 5.827-3.303-2.752-.81.972 4.296 3.581v-.001z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default DoneIcon;
