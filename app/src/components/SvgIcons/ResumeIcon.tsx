import Svg, { Path } from "react-native-svg";
interface Props {
  color?: string;
}
const ResumeIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 19" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.686.986c0-.262-.089-.512-.247-.697A.786.786 0 00.843 0a.786.786 0 00-.596.289A1.077 1.077 0 000 .986v17.028c0 .262.089.512.247.697A.786.786 0 00.843 19a.786.786 0 00.596-.289c.158-.185.247-.435.247-.697V.986zM5.798.194a.677.677 0 00-.753.025.849.849 0 00-.271.327c-.065.134-.1.286-.1.44v17.028c0 .155.035.306.1.44a.848.848 0 00.271.327.677.677 0 00.753.026l13.794-8.515a.832.832 0 00.298-.33c.072-.14.11-.299.11-.462 0-.163-.038-.323-.11-.462a.833.833 0 00-.298-.33L5.798.194zm.41 16.332V2.472L17.592 9.5 6.206 16.526h.001z"
        fill={color ? color : "#F5F8FF"}
      />
    </Svg>
  );
};

export default ResumeIcon;
