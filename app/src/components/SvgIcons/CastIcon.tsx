import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const CastIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      viewBox="0 0 20 15"
      className="w-fill h-full"
      fill={color ? color : "#FFFFFF"}
    >
      <Path d="M.195 14.084h2.102a2.102 2.102 0 00-2.102-2.102v2.102zm4.904 0H3.7A3.507 3.507 0 00.194 10.58V9.18A4.91 4.91 0 015.1 14.084z" />
      <Path d="M7.902 14.081H6.5A6.312 6.312 0 00.195 7.776V6.375a7.715 7.715 0 017.707 7.706z" />
      <Path d="M18.41 14.082H9.303V12.68h9.107V1.47H1.596v3.503h-1.4V1.471a1.403 1.403 0 011.4-1.4H18.41a1.403 1.403 0 011.401 1.4v11.21a1.403 1.403 0 01-1.4 1.4z" />
    </Svg>
  );
};

export default CastIcon;
