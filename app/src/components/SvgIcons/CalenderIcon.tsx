import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const CalenderIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 23 23" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.55 2.3h-2.3V1.15a1.15 1.15 0 00-2.3 0V2.3h-6.9V1.15a1.15 1.15 0 10-2.3 0V2.3h-2.3A3.45 3.45 0 000 5.75v13.8A3.45 3.45 0 003.45 23h16.1A3.45 3.45 0 0023 19.55V5.75a3.45 3.45 0 00-3.45-3.45zm1.15 17.25a1.15 1.15 0 01-1.15 1.15H3.45a1.15 1.15 0 01-1.15-1.15V11.5h18.4v8.05zm0-10.35H2.3V5.75A1.15 1.15 0 013.45 4.6h2.3v1.15a1.15 1.15 0 102.3 0V4.6h6.9v1.15a1.15 1.15 0 002.3 0V4.6h2.3a1.15 1.15 0 011.15 1.15V9.2zM14 15h-2v-2h2v2zm2 0h2v-2h-2v2zm-6 0H8v-2h2v2zm-2 4h2v-2H8v2zm6 0h-2v-2h2v2zM4 19h2v-2H4v2z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default CalenderIcon;
