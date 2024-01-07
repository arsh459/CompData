import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  opacity?: number;
}

const MoonIcon: React.FC<Props> = ({ color, opacity }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 14 14" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.206.704c-.273-.41.216-.898.626-.624l.73.487a1.804 1.804 0 002.002 0l.73-.487c.411-.274.9.215.626.624l-.487.731a1.804 1.804 0 000 2.002l.487.731c.274.41-.215.899-.625.625l-.73-.487a1.803 1.803 0 00-2.002 0l-.73.487c-.41.274-.9-.215-.627-.625l.487-.73a1.804 1.804 0 000-2.003l-.487-.73zm4.087 8.35c.38-.168.834.154.675.532-1.083 2.59-3.68 4.415-6.714 4.415C3.247 14 0 10.819 0 6.893 0 3.588 2.302.81 5.42.014c.405-.103.67.38.45.728a5.662 5.662 0 00-.883 3.041c0 3.19 2.639 5.775 5.894 5.775.83.002 1.651-.17 2.412-.504z"
        fill={color ? color : "#fff"}
        fillOpacity={opacity ? opacity : 1}
      />
    </Svg>
  );
};

export default MoonIcon;
