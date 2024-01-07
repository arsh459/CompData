import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const StarIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 10 11" fill="none">
      <Path
        d="M4.62 1.17a.4.4 0 01.76 0l.877 2.7a.4.4 0 00.38.276h2.838a.4.4 0 01.235.724L7.415 6.537a.4.4 0 00-.146.448l.877 2.698a.4.4 0 01-.615.447L5.235 8.463a.4.4 0 00-.47 0L2.469 10.13a.4.4 0 01-.615-.448l.877-2.698a.4.4 0 00-.146-.448L.29 4.87a.4.4 0 01.235-.724h2.837a.4.4 0 00.38-.276l.878-2.7z"
        fill={color ? color : "#51FF8C"}
      />
    </Svg>
  );
};

export default StarIcon;
