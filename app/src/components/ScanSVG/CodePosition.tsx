import Svg, { Path } from "react-native-svg";

const CodePosition = () => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 260 256" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54 0H29C12.984 0 0 12.984 0 29v25h4V29C4 15.193 15.193 4 29 4h25V0zm0 252H29c-13.807 0-25-11.193-25-25v-25H0v25c0 16.016 12.984 29 29 29h25v-4zm148 4v-4h29c13.807 0 25-11.193 25-25v-25h4v25c0 16.016-12.984 29-29 29h-29zm0-252V0h29c16.016 0 29 12.984 29 29v25h-4V29c0-13.807-11.193-25-25-25h-29z"
        fill="#fff"
      />
    </Svg>
  );
};

export default CodePosition;
