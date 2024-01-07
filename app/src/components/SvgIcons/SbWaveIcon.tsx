import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  color?: string;
}

const SbWaveIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 52 52" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.37 21.34h2.17a1.83 1.83 0 001.297-.537L28.04 19.6h-2.13a1.952 1.952 0 00-1.385.577L23.37 21.34zm.249 2.964h-2.926l1.154-1.2a1.921 1.921 0 011.385-.596h8.196l-1.155 1.201a1.921 1.921 0 01-1.385.595H23.62zm-2.965 1.203h14.171l-1.43 1.466a1.426 1.426 0 01-1.023.434H18.2l1.43-1.466a1.427 1.427 0 011.024-.434zm8.752 3.192h2.93L31.182 29.9a1.923 1.923 0 01-1.383.595h-8.198l1.154-1.2a1.921 1.921 0 011.384-.596H29.406zm.256 2.963H27.49c-.486 0-.952.193-1.296.536L24.992 33.4h2.13a1.95 1.95 0 001.385-.577l1.154-1.162z"
        fill={color ? color : "#fff"}
      />
      <Circle
        cx={26}
        cy={26}
        r={15}
        stroke={color ? color : "#fff"}
        strokeWidth={2}
      />
      <Circle cx={26} cy={26} r={19.5} stroke={color ? color : "#fff"} />
      <Circle
        cx={26}
        cy={26}
        r={22.75}
        stroke={color ? color : "#fff"}
        strokeWidth={0.5}
      />
      <Circle
        cx={26}
        cy={26}
        r={25.9}
        stroke={color ? color : "#fff"}
        strokeWidth={0.2}
      />
    </Svg>
  );
};
export default SbWaveIcon;
