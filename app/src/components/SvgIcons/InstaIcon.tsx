import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const InstaIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 22 22" fill="none">
      <Path
        d="M10.997 7.332A3.676 3.676 0 007.329 11a3.676 3.676 0 003.668 3.668A3.676 3.676 0 0014.665 11a3.676 3.676 0 00-3.668-3.668zM21.999 11c0-1.519.014-3.024-.072-4.54-.085-1.762-.487-3.325-1.775-4.613-1.29-1.29-2.85-1.69-4.612-1.775C14.021-.013 12.516.001 11 .001 9.48 0 7.976-.013 6.46.072 4.697.158 3.134.56 1.846 1.847.557 3.137.157 4.698.072 6.46-.013 7.98.001 9.484.001 11c0 1.516-.014 3.024.071 4.54.086 1.762.487 3.325 1.775 4.613 1.29 1.29 2.851 1.69 4.612 1.775 1.52.085 3.025.071 4.54.071 1.52 0 3.025.014 4.541-.071 1.761-.086 3.325-.487 4.612-1.775 1.29-1.29 1.69-2.851 1.775-4.612.088-1.517.072-3.022.072-4.541zm-11.002 5.644A5.636 5.636 0 015.353 11a5.636 5.636 0 015.644-5.644A5.636 5.636 0 0116.641 11a5.636 5.636 0 01-5.644 5.644zm5.875-10.201c-.73 0-1.318-.589-1.318-1.318 0-.73.589-1.318 1.318-1.318a1.317 1.317 0 01.933 2.25 1.316 1.316 0 01-.933.386z"
        fill={color ? color : "#35325A"}
      />
    </Svg>
  );
};

export default InstaIcon;