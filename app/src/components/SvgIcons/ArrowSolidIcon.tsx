import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const ArrowSolidIcon: React.FC<Props> = ({ color, direction }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 11 14"
      fill="none"
      style={{
        transform: [
          {
            rotate:
              direction === "top"
                ? "-90deg"
                : direction === "bottom"
                ? "90deg"
                : direction === "left"
                ? "180deg"
                : "0deg",
          },
        ],
      }}
    >
      <Path
        d="M1.537 12.948A1 1 0 010 12.104V1.747A1 1 0 011.537.904l8.137 5.178a1 1 0 010 1.687l-8.137 5.179z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default ArrowSolidIcon;
