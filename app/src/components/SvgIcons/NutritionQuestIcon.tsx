import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

function NutritionQuestIcon() {
  return (
    <Svg className="w-full h-full" viewBox="0 0 14 14" fill="none">
      <G clipPath="url(#clip0_13557_2290)">
        <Path
          d="M.882 5.363v-.009a4.586 4.586 0 012.826-4.226 4.599 4.599 0 014.998.98A3.065 3.065 0 0112.9 3.713c.209.522.27 1.092.175 1.646a1.021 1.021 0 01.894.766c.035.135.04.276.017.414-.46 2.766-1.6 4.516-3.418 5.252v.684A1.524 1.524 0 019.04 14H4.961a1.531 1.531 0 01-1.53-1.526v-.684C1.614 11.054.475 9.304.014 6.538a1.015 1.015 0 01.868-1.174zm1.02-.009h1.02c0-.674.268-1.32.746-1.798a2.552 2.552 0 013.605 0 2.54 2.54 0 01.746 1.798h1.02c0-.944-.376-1.85-1.045-2.517a3.573 3.573 0 00-5.047 0 3.555 3.555 0 00-1.045 2.517zm2.04 0H7A1.524 1.524 0 005.47 3.83a1.531 1.531 0 00-1.529 1.525zm7 0h1.092a2.033 2.033 0 00-1.079-2.333 2.047 2.047 0 00-1.59-.088c.18.288.33.6.444.926a1.024 1.024 0 011.265.924c.013.2-.033.398-.132.571zm-1.393 6.611H4.45v.509a.508.508 0 00.51.508h4.078a.51.51 0 00.51-.508v-.509zm-5.457-1.017h5.816c1.617-.518 2.64-1.985 3.073-4.577H1.019c.432 2.592 1.456 4.059 3.073 4.577z"
          fill="url(#paint0_linear_13557_2290)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_13557_2290"
          x1={7}
          y1={0.777344}
          x2={7}
          y2={13.9996}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFE458" />
          <Stop offset={1} stopColor="#FFB310" />
        </LinearGradient>
        <ClipPath id="clip0_13557_2290">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default NutritionQuestIcon;
