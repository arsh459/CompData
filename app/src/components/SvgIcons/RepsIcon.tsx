import Svg, { Circle, Path } from "react-native-svg";
interface Props {
  color?: string;
}
const RepsIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 35 26"
      fill={color ? color : "#0085E0"}
    >
      <Circle cx={3.125} cy={9.125} r={3.125} />
      <Path d="M10.185 9.884C7.35 9.274 6.64 10.9 6.64 11.789c-.158 1.068.065 2.097.197 2.478l1.379 4.193c-.788.826-2.482 2.63-2.955 3.24-.473.61-.197 1.144 0 1.335.066.063.276.228.591.38.315.153.92.064 1.182 0l4.136-4.002c.591-1.334 0-1.906 0-2.668 0-.763.526-.699.788-.572 5.384 2.287 16.704 6.938 18.91 7.243 2.206.305 1.707-1.144 1.182-1.906-2.955-1.652-9.022-5.032-9.652-5.337-.788-.381-.477-1.585-1.182-2.096-1.576-1.144-7.485-3.431-11.03-4.193zM0 24.75h35V26H0zM20.474 7.206a3.992 3.992 0 01-2.764 1.1 3.992 3.992 0 01-2.765-1.1.308.308 0 01.105-.512.332.332 0 01.355.069 3.299 3.299 0 001.668.857c.632.12 1.286.058 1.881-.179a3.234 3.234 0 001.462-1.155 3.053 3.053 0 00.548-1.741c0-.62-.19-1.226-.548-1.742a3.234 3.234 0 00-1.462-1.155 3.375 3.375 0 00-1.881-.179 3.299 3.299 0 00-1.668.857l-.827.796h1.169c.086 0 .17.033.23.092a.308.308 0 010 .443.332.332 0 01-.23.092h-1.954a.332.332 0 01-.23-.092.308.308 0 01-.096-.221V1.554c0-.083.034-.163.095-.221a.332.332 0 01.46 0 .308.308 0 01.096.221V2.68l.827-.795A3.989 3.989 0 0117.71.78c1.037 0 2.031.397 2.764 1.103a3.693 3.693 0 011.145 2.66c0 .999-.412 1.956-1.145 2.662z" />
    </Svg>
  );
};

export default RepsIcon;