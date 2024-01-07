import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function WorkoutQuestIcon() {
  return (
    <Svg className="w-full h-full" viewBox="0 0 14 15" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.965.433v7.211c0 .67-.481 1.65-.967 2.637-.454.925-.913 1.858-.985 2.555-.12 1.154.65.866 1.05.578l2.403-4.616.3-.577H9.77c.36 0 .55.192.6.289.551 1.49 1.743 4.673 2.103 5.48.45 1.01.75 1.01 1.201 1.01.36 0 .35-.673.3-1.01-.35-1.442-1.14-4.788-1.501-6.634-.36-1.846-1.652-2.308-2.253-2.308H6.917c-.24 0-.3-.096-.3-.144-.15-1.442-.451-4.356-.451-4.471 0-.145-.15-.433-.6-.433-.361 0-.551.288-.601.433zM4 6a2 2 0 11-4 0 2 2 0 014 0zm3.833 3H10l-1.667 5.522c-.166.597-1.333.776-1.333-.299 0-1.074.556-3.93.833-5.223z"
        fill="url(#paint0_linear_13547_2114)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_13547_2114"
          x1={5}
          y1={6.88547e-8}
          x2={9.5}
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#58F5FF" />
          <Stop offset={1} stopColor="#11BFFF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default WorkoutQuestIcon;
