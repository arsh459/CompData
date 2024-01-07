import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const JourneyLogIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.167 4.583a4.583 4.583 0 11-9.167 0 4.583 4.583 0 019.167 0zm6.25 4.584a4.583 4.583 0 100-9.167 4.583 4.583 0 000 9.167zM4.583 10.833a4.583 4.583 0 100 9.166 4.583 4.583 0 000-9.166zm13.75 3.75H16.25V12.5a.833.833 0 00-1.667 0v2.083H12.5a.833.833 0 000 1.667h2.083v2.083a.833.833 0 001.667 0V16.25h2.083a.833.833 0 000-1.667z"
        fill={color ? color : "#FFF"}
      />
    </Svg>
  );
};

export default JourneyLogIcon;
