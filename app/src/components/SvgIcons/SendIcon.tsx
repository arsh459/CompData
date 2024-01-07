import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const SendIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 19 19" fill="none">
      <Path
        d="M.894 6.231L16.934.488a.91.91 0 01.945.209.896.896 0 01.209.944l-5.744 16.04a.923.923 0 01-.778.608.903.903 0 01-.868-.449l-3.606-6.356L.736 7.878a.893.893 0 01-.45-.868.92.92 0 01.608-.779zm.732.892l5.793 3.288 5.657-5.655a.552.552 0 01.35-.16.54.54 0 01.366.107l.055.048a.538.538 0 01.156.347.55.55 0 01-.111.368l-.05.056-5.662 5.662 3.273 5.765 5.48-15.307L1.626 7.123z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default SendIcon;
