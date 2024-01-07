import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const SignOutIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 22 20" fill="none">
      <Path
        d="M13 4.826V3a1.999 1.999 0 00-2.166-1.993l-8 .666A2 2 0 001 3.666v12.32a2 2 0 001.834 1.993l8 .667A2 2 0 0013 16.652v-1.826m-1-5h9-9zm9 0l-3.333-4 3.333 4zm0 0l-3.333 4 3.333-4z"
        stroke={color ? color : "#100F1A"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SignOutIcon;
