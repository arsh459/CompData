import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const CommunityIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 24 21" fill="none">
      <Path
        d="M15.75 13.994c.966 0 1.75.784 1.75 1.75v2l-.008.108c-.31 2.126-2.22 3.148-5.425 3.148-3.193 0-5.134-1.01-5.553-3.11l-.014-.148v-1.999c0-.965.784-1.749 1.75-1.749h7.5zm.494-5.997h6.006c.966 0 1.75.783 1.75 1.749v2.001l-.008.108c-.31 2.126-2.22 3.148-5.425 3.148L18.399 15a2.75 2.75 0 00-2.47-2l-.179-.007h-.922A4.488 4.488 0 0016.5 9.496c0-.526-.09-1.03-.256-1.5zm-14.494 0h6.006c-.166.47-.256.973-.256 1.499 0 1.33.578 2.526 1.496 3.348l.176.15H8.25c-1.262 0-2.326.85-2.65 2.01l-.033-.001c-3.193 0-5.134-1.01-5.553-3.111L0 11.745v-2c0-.965.784-1.748 1.75-1.748zm10.25-2a3.5 3.5 0 013.5 3.499 3.498 3.498 0 01-3.5 3.498 3.5 3.5 0 01-3.5-3.498A3.498 3.498 0 0112 5.997zM18.5 0A3.5 3.5 0 0122 3.498a3.498 3.498 0 01-3.5 3.499A3.5 3.5 0 0115 3.499 3.498 3.498 0 0118.5 0zm-13 0A3.5 3.5 0 019 3.498a3.498 3.498 0 01-3.5 3.499A3.5 3.5 0 012 3.499 3.498 3.498 0 015.5 0z"
        fill={color ? color : "#fff"}
        fillOpacity={1}
      />
    </Svg>
  );
};

export default CommunityIcon;
