import { LinearGradient } from "expo-linear-gradient";

export const headerElevation: number = 1000;

export type gradientDirectionType = "toRight" | "toLeft" | "toBottom" | "toTop";

const gradientDirectionConst: {
  [key in gradientDirectionType]: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  };
} = {
  toRight: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  toLeft: { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } },
  toBottom: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  toTop: { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } },
};

interface Props {
  gradientColors?: string[];
  gradientDirection?: gradientDirectionType;
}

const GradientBG: React.FC<Props> = ({ gradientColors, gradientDirection }) => {
  return gradientColors ? (
    <LinearGradient
      colors={
        gradientColors.length >= 2
          ? gradientColors
          : ["transparent", "transparent"]
      }
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: headerElevation / 2,
        zIndex: headerElevation / 2,
      }}
      start={
        gradientDirectionConst[
          gradientDirection ? gradientDirection : "toRight"
        ].start
      }
      end={
        gradientDirectionConst[
          gradientDirection ? gradientDirection : "toRight"
        ].end
      }
    />
  ) : null;
};

export default GradientBG;
