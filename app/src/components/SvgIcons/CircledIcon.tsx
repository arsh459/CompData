import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const CircledIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 24 24"
      fill={color ? color : "#DDF0FF"}
    >
      <Path
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 21.964c5.502 0 9.964-4.462 9.964-9.964 0-5.502-4.462-9.964-9.964-9.964-5.502 0-9.964 4.462-9.964 9.964 0 5.502 4.462 9.964 9.964 9.964z"
        fill="#DDF0FF"
      />
      <Path
        d="M13.286 7.286a1.286 1.286 0 11-2.571 0 1.286 1.286 0 012.571 0zm-1.928 3h1.285c.118 0 .215.096.215.214v7.286a.215.215 0 01-.215.214h-1.285a.215.215 0 01-.215-.214V10.5c0-.118.097-.214.215-.214z"
        fill="#DDF0FF"
      />
      <Path
        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 21.964c5.502 0 9.964-4.462 9.964-9.964 0-5.502-4.462-9.964-9.964-9.964-5.502 0-9.964 4.462-9.964 9.964 0 5.502 4.462 9.964 9.964 9.964z"
        fill="#DDF0FF"
      />
    </Svg>
  );
};

export default CircledIcon;
