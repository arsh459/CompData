import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const RewardIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
      <Path
        d="M3 10H2v8a2 2 0 002 2h5V10H3zm13 0h-5v10h5a2 2 0 002-2v-8h-2zm.791-5c.147-.486.217-.992.209-1.5C17 1.57 15.43 0 13.5 0c-1.622 0-2.705 1.482-3.404 3.085C9.407 1.57 8.269 0 6.5 0 4.57 0 3 1.57 3 3.5c0 .596.079 1.089.209 1.5H0v4h9V7h2v2h9V5h-3.209zM5 3.5C5 2.673 5.673 2 6.5 2c.888 0 1.714 1.525 2.198 3H6c-.374 0-1 0-1-1.5zM13.5 2c.827 0 1.5.673 1.5 1.5C15 5 14.374 5 14 5h-2.477c.51-1.576 1.251-3 1.977-3z"
        fill={color ? color : "#fff"}
        fillOpacity={1}
      />
    </Svg>
  );
};

export default RewardIcon;
