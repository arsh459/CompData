import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const HomeIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 21 21" fill="none">
      <Path
        d="M19.436 10.673a.629.629 0 01-.446-.182l-8.976-8.983-8.977 8.983a.628.628 0 01-.886-.886L9.574.183a.628.628 0 01.886 0l9.422 9.422a.628.628 0 01-.446 1.068z"
        fill={color ? color : "#F5F8FF"}
      />
      <Path
        d="M10.007 3.633l-7.538 7.563v7.645a1.256 1.256 0 001.256 1.256h4.397v-6.281h3.77v6.281h4.397a1.256 1.256 0 001.256-1.256v-7.689l-7.538-7.52z"
        fill={color ? color : "#F5F8FF"}
      />
    </Svg>
  );
};

export default HomeIcon;
