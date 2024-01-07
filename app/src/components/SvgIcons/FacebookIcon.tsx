import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const FacebookIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 22 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11.061C0 16.531 3.972 21.078 9.167 22v-7.945h-2.75V11h2.75V8.555c0-2.75 1.772-4.277 4.278-4.277.794 0 1.65.122 2.444.244v2.811h-1.406c-1.344 0-1.65.672-1.65 1.528V11h2.934l-.489 3.055h-2.445V22C18.028 21.078 22 16.531 22 11.061 22 4.978 17.05 0 11 0S0 4.978 0 11.061z"
        fill={color ? color : "#35325A"}
      />
    </Svg>
  );
};

export default FacebookIcon;
