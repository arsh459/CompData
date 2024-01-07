import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const SearchIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 16 16" fill="none">
      <Path
        d="M15.775 14.651l-2.966-2.944a7.205 7.205 0 00-.811-9.869 7.192 7.192 0 00-9.89.271 7.204 7.204 0 004.498 12.27 7.192 7.192 0 005.092-1.56l2.942 2.944a.8.8 0 001.135 0 .8.8 0 000-1.112zM7.212 12.82a5.594 5.594 0 01-5.17-3.458A5.605 5.605 0 016.12 1.725a5.593 5.593 0 015.745 2.381 5.604 5.604 0 01-.696 7.072 5.595 5.595 0 01-3.958 1.64z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default SearchIcon;
