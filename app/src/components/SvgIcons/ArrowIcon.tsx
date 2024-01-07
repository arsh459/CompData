import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
  direction?: "top" | "bottom" | "left" | "right";
}

const ArrowIcon: React.FC<Props> = ({ color, direction }) => {
  return (
    <Svg
      className="w-full h-full"
      viewBox="0 0 5 11"
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
        d="M.99.218l3.883 4.876c.046.058.079.12.098.188A.79.79 0 015 5.5a.79.79 0 01-.029.218.534.534 0 01-.098.188l-3.882 4.89A.495.495 0 01.588 11a.515.515 0 01-.415-.218.793.793 0 01-.173-.508c0-.193.058-.362.173-.508L3.56 5.5.173 1.234a.78.78 0 01-.161-.5c0-.2.057-.371.172-.516C.3.073.434 0 .588 0 .74 0 .876.073.99.218z"
        fill={color ? color : "#FFFFFF"}
      />
    </Svg>
  );
};

export default ArrowIcon;
