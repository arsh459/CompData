import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const RecoveryIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 32 33" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.92.714a4.914 4.914 0 015.103 0l1.811 1.112c2.542 1.558 5.437 1.905 8.345 2.254.94.114 1.881.226 2.812.38 0 0 .02 1.636 0 2.378l-.187 6.378c-.16 5.47-2.585 10.656-6.745 14.425-1.963 1.777-3.994 3.384-6.326 4.718a4.92 4.92 0 01-4.536.167A29.875 29.875 0 016.94 27.64C2.78 23.87.354 18.686.195 13.216L.01 6.858c-.022-.753 0-2.398 0-2.398.756-.089 1.526-.163 2.302-.237 3.427-.326 6.968-.664 9.872-2.444L13.921.714zm.293 13.557V8.028h3.557v6.243h6.226v3.567H17.77v6.243h-3.557v-6.243H7.987v-3.567h6.226z"
        fill={color ? color : "#F5F8FF"}
      />
    </Svg>
  );
};

export default RecoveryIcon;
