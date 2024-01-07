import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}
const CameraIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full aspect-[14/12]" viewBox="0 0 14 12" fill="none">
      <Path
        d="M12.6 1.333h-2.134a.2.2 0 01-.144-.06l-.809-.84a1.393 1.393 0 00-.467-.32A1.453 1.453 0 008.484 0H5.516c-.392 0-.77.16-1.036.433l-.802.839a.2.2 0 01-.144.061H1.4c-.77 0-1.4.6-1.4 1.334v8C0 11.4.63 12 1.4 12h11.2c.77 0 1.4-.6 1.4-1.333v-8c0-.734-.63-1.334-1.4-1.334zM7 10c-1.932 0-3.5-1.493-3.5-3.333S5.068 3.333 7 3.333s3.5 1.494 3.5 3.334S8.932 10 7 10zm.18-5.622a.2.2 0 00-.36 0l-.663 1.388a.2.2 0 01-.1.097l-1.433.62a.2.2 0 000 .367l1.432.62a.2.2 0 01.101.098l.662 1.387a.2.2 0 00.362 0l.662-1.387a.2.2 0 01.1-.098l1.433-.62a.2.2 0 000-.367l-1.432-.62a.2.2 0 01-.101-.097L7.18 4.378z"
        fill={color ? color : "#fff"}
      />
    </Svg>
  );
};

export default CameraIcon;
