import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const ProfileIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 18 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 17.1A8.1 8.1 0 109 .9a8.1 8.1 0 000 16.2zm0 .9A9 9 0 109 0a9 9 0 00-9 9 9 9 0 009 9z"
        fill={color ? color : "#100F1A"}
      />
      <Path
        d="M3.602 14.238c0-.465.347-.858.81-.909 3.471-.384 5.724-.35 9.188.009a.895.895 0 01.498 1.562c-4.088 3.564-6.424 3.515-10.208.004a.908.908 0 01-.288-.665z"
        fill={color ? color : "#100F1A"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.55 13.782c-3.436-.355-5.656-.389-9.093-.008a.463.463 0 00-.265.797c1.876 1.74 3.297 2.526 4.686 2.53 1.394.006 2.892-.774 4.921-2.543a.445.445 0 00-.249-.775v-.001zm-9.191-.903c3.508-.388 5.793-.353 9.284.008a1.345 1.345 0 01.748 2.35c-2.059 1.794-3.773 2.771-5.515 2.765-1.748-.007-3.387-1-5.295-2.771a1.359 1.359 0 01-.433-.996 1.362 1.362 0 011.21-1.357z"
        fill={color ? color : "#100F1A"}
      />
      <Path
        d="M12.598 7.202a3.6 3.6 0 11-7.2 0 3.6 3.6 0 017.2 0z"
        fill={color ? color : "#100F1A"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.998 9.902a2.7 2.7 0 100-5.4 2.7 2.7 0 000 5.4zm0 .9a3.6 3.6 0 100-7.2 3.6 3.6 0 000 7.2z"
        fill={color ? color : "#100F1A"}
      />
    </Svg>
  );
};

export default ProfileIcon;
