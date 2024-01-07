import Svg, { Path, Rect } from "react-native-svg";

interface Props {
  colorBell?: string;
  colorDot?: string;
  showDot?: boolean;
}

const NotifyBell: React.FC<Props> = ({ colorBell, colorDot, showDot }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 25" fill="none">
      <Path
        d="M1.25 21.25a1.21 1.21 0 01-.891-.36A1.209 1.209 0 010 20c0-.354.12-.65.359-.89.24-.24.537-.36.891-.36H2.5V10c0-1.73.52-3.266 1.563-4.61 1.041-1.343 2.395-2.223 4.062-2.64v-.875c0-.52.182-.963.547-1.328A1.805 1.805 0 0110 0c.52 0 .963.182 1.328.547.365.365.547.807.547 1.328v.875c1.667.417 3.02 1.297 4.063 2.64C16.979 6.734 17.5 8.27 17.5 10v8.75h1.25c.354 0 .65.12.89.36s.36.536.36.89-.12.65-.36.89-.536.36-.89.36H1.25zM10 25a2.407 2.407 0 01-1.765-.734A2.408 2.408 0 017.5 22.5h5a2.41 2.41 0 01-.734 1.766A2.41 2.41 0 0110 25zm-5-6.25h10V10c0-1.375-.49-2.552-1.469-3.531C12.552 5.489 11.375 5 10 5s-2.552.49-3.531 1.469C5.489 7.448 5 8.625 5 10v8.75z"
        fill={colorBell ? colorBell : "#fff"}
      />
      {showDot ? (
        <Rect
          x={13}
          y={4}
          width={6}
          height={6}
          rx={3}
          fill={colorDot ? colorDot : "#FF556C"}
        />
      ) : null}
    </Svg>
  );
};

export default NotifyBell;
