import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
export const TickCheck: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 16 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.263 10.87a1.023 1.023 0 001.544.112l9.235-9.235A1.023 1.023 0 0013.595.3l-8.4 8.399-3.322-3.486A1.086 1.086 0 10.3 6.712l3.963 4.158z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default TickCheck;
