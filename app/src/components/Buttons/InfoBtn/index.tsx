import { TouchableHighlight } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  color?: string;
  onPress?: () => void;
}

const InfoBtn: React.FC<Props> = ({ color, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <Svg
        className="w-7 h-7 iphoneX:w-7 iphoneX:h-7"
        viewBox="0 0 32 32"
        fill="none"
      >
        <Path
          d="M15 12.8571C15 13.0845 15.1054 13.3025 15.2929 13.4632C15.4804 13.624 15.7348 13.7143 16 13.7143C16.2652 13.7143 16.5196 13.624 16.7071 13.4632C16.8946 13.3025 17 13.0845 17 12.8571C17 12.6298 16.8946 12.4118 16.7071 12.2511C16.5196 12.0903 16.2652 12 16 12C15.7348 12 15.4804 12.0903 15.2929 12.2511C15.1054 12.4118 15 12.6298 15 12.8571V12.8571ZM16.5 14.8571H15.5C15.4083 14.8571 15.3333 14.9214 15.3333 15V19.8571C15.3333 19.9357 15.4083 20 15.5 20H16.5C16.5917 20 16.6667 19.9357 16.6667 19.8571V15C16.6667 14.9214 16.5917 14.8571 16.5 14.8571Z"
          fill={color ? color : "#DFDFDF"}
        />
        <Circle
          cx="16"
          cy="16"
          r="10"
          stroke={color ? color : "#DFDFDF"}
          strokeWidth="2"
        />
        <Circle
          cx="16"
          cy="16"
          r="13.5"
          stroke={color ? color : "#DFDFDF"}
          strokeWidth="1"
        />
        <Circle
          cx="16"
          cy="16"
          r="15.85"
          stroke={color ? color : "#DFDFDF"}
          strokeWidth="0.5"
        />
      </Svg>
    </TouchableHighlight>
  );
};

export default InfoBtn;
