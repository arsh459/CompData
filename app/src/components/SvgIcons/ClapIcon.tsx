import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const ClapIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 15 17" fill="none">
      <Path
        d="M12.825 6.726l-1.117-2.041a1.498 1.498 0 00-.37-.45 1.409 1.409 0 00-.504-.265 1.363 1.363 0 00-1.096.152 1.475 1.475 0 00-.63.792L7.952 2.81a1.5 1.5 0 00-.37-.45 1.409 1.409 0 00-.505-.265 1.363 1.363 0 00-1.095.153 1.475 1.475 0 00-.63.791c-.201-.332-.515-.57-.877-.664a1.383 1.383 0 00-1.068.157c-.164.1-.308.235-.423.395-.115.16-.199.342-.247.536a1.532 1.532 0 00-.026.666c-.256.021-.505.102-.729.236-.392.241-.678.637-.795 1.1-.117.464-.055.957.171 1.372l.131.237a1.539 1.539 0 00-.637.229c-.391.24-.677.634-.794 1.096-.117.462-.056.954.17 1.369l2.43 4.45a5.386 5.386 0 002.227 2.208c.932.487 1.98.67 3.011.527a5.128 5.128 0 002.78-1.333 5.61 5.61 0 001.61-2.741l.02-.09a5.475 5.475 0 001.162-2.945 5.564 5.564 0 00-.643-3.118zm-1.557 5.868a4.501 4.501 0 01-.722 1.555c-.336.463-.756.85-1.235 1.14a4.004 4.004 0 01-3.188.443c-1.076-.304-1.994-1.049-2.552-2.069l-2.43-4.45a.727.727 0 01.046-.771.66.66 0 01.309-.236.623.623 0 01.381-.014c.168.05.312.166.4.326l1.577 2.889a.554.554 0 00.192.2c.08.05.17.076.26.077a.504.504 0 00.263-.075.542.542 0 00.191-.203.58.58 0 000-.555L2.264 6.282a.732.732 0 01-.064-.529.693.693 0 01.307-.422.628.628 0 01.5-.069.665.665 0 01.4.326l2.496 4.569a.518.518 0 00.533.312.506.506 0 00.204-.072.538.538 0 00.16-.152.571.571 0 00.092-.434.573.573 0 00-.083-.21l-1.97-3.61a.737.737 0 01-.063-.53.698.698 0 01.306-.422c.15-.09.33-.114.496-.066.168.048.31.164.397.323l2.758 5.055a.554.554 0 00.196.203c.08.048.171.074.264.075a.54.54 0 00.263-.076.553.553 0 00.242-.337.584.584 0 00-.052-.42l-1.05-1.93a.722.722 0 01.046-.768.642.642 0 01.196-.177.596.596 0 01.493-.07.63.63 0 01.23.117.67.67 0 01.17.203l1.117 2.048c.278.505.458 1.064.53 1.643.073.58.035 1.168-.11 1.732zM10.165 1.491l.27-1.077a.57.57 0 01.243-.339.508.508 0 01.72.202.579.579 0 01.054.422l-.276 1.076a.551.551 0 01-.186.297.5.5 0 01-.32.113l-.137-.014a.53.53 0 01-.317-.26.584.584 0 01-.051-.42zm1.727.638l.604-.91a.53.53 0 01.341-.228.509.509 0 01.537.248.575.575 0 01-.017.62l-.605.91a.532.532 0 01-.338.227.491.491 0 01-.39-.096.56.56 0 01-.216-.357.581.581 0 01.084-.414zm2.883 1.5l-.86.64a.507.507 0 01-.61-.011.555.555 0 01-.189-.28.586.586 0 01.002-.343.554.554 0 01.193-.276l.86-.64a.512.512 0 01.394-.095.509.509 0 01.341.228c.08.122.11.271.086.417a.567.567 0 01-.217.36z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default ClapIcon;