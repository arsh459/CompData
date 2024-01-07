import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const LinkedinIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 22 22" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.838A1.838 1.838 0 011.838 0H20.16A1.836 1.836 0 0122 1.838V20.16A1.838 1.838 0 0120.161 22H1.838A1.839 1.839 0 010 20.161V1.838zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634 3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8-1.515 0-2.145 1.089-2.145 2.8v5.106H8.708V8.388zm-5.5 10.403h3.208V8.25H3.208V18.791zM6.875 4.812a2.063 2.063 0 11-4.125.09 2.063 2.063 0 014.125-.09z"
        fill={color ? color : "#35325A"}
      />
    </Svg>
  );
};

export default LinkedinIcon;
