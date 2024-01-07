import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const ArrowIconPointed: React.FC<Props> = ({ color, direction }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 15 16"
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
        d="M14.707 8.707a1 1 0 000-1.414L8.343.929A1 1 0 006.93 2.343L12.586 8l-5.657 5.657a1 1 0 101.414 1.414l6.364-6.364zM0 9h14V7H0v2z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default ArrowIconPointed;
