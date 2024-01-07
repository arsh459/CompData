import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const QuestCompletedIcon: React.FC = () => (
  <Svg className="w-full h-full" viewBox="0 0 18 18" fill="none">
    <Circle cx={9} cy={9} r={9} fill="#51FF8C" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.74467 11.9822C6.76036 12.002 6.77736 12.0211 6.79566 12.0394C7.05185 12.2956 7.46722 12.2956 7.72341 12.0394L13.6429 6.11989C13.8991 5.8637 13.8991 5.44833 13.6429 5.19214C13.3868 4.93595 12.9714 4.93595 12.7152 5.19214L7.32992 10.5774L5.20055 8.34363C4.93515 8.06522 4.49432 8.05467 4.21591 8.32006C3.9375 8.58545 3.92695 9.02629 4.19234 9.3047L6.74467 11.9822Z"
      fill="#232136"
    />
  </Svg>
);
export default QuestCompletedIcon;
