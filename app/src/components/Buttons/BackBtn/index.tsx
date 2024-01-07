import { backIcon } from "@modules/Header/BackNode";
import clsx from "clsx";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";
// import Svg, { Path, Circle } from "react-native-svg";
import Svg, { G, Circle, Path, Defs } from "react-native-svg";

interface Props {
  onBack: () => void;
  classStr?: string;
  color?: string;
  icon?: backIcon;
  backIconSvg?: ReactNode;
}

const BackBtn: React.FC<Props> = ({
  onBack,
  classStr,
  color,
  icon,
  backIconSvg,
}) => {
  return (
    <TouchableOpacity
      className={clsx(classStr ? classStr : "w-4 h-4")}
      onPress={onBack}
    >
      {backIconSvg ? (
        backIconSvg
      ) : icon === "arrow" ? (
        <Svg className="w-full h-full" viewBox="0 0 16 14" fill="none">
          <Path
            d="M.47 5.47a.75.75 0 000 1.06l4.773 4.773a.75.75 0 101.06-1.06L2.061 6l4.242-4.243a.75.75 0 00-1.06-1.06L.47 5.47zM14 5.25H1v1.5h13v-1.5z"
            fill={color ? color : "#000"}
          />
        </Svg>
      ) : icon === "arrow_circle" ? (
        <Svg className="w-full h-full" viewBox="0 0 36 36" fill="none">
          <Path
            d="M9.293 17.293a1 1 0 000 1.414l6.364 6.364a1 1 0 001.414-1.414L11.414 18l5.657-5.657a1 1 0 00-1.414-1.414l-6.364 6.364zM26 17H10v2h16v-2z"
            fill={color ? color : "#000"}
          />
          <Circle cx={18} cy={18} r={17.5} stroke={color ? color : "#000"} />
        </Svg>
      ) : icon === "arrow_filled" ? (
        <>
          <Svg className="w-full h-full" viewBox="0 0 38 38" fill="none">
            <G filter="url(#filter0_d_0_1)">
              <Circle cx={19} cy={15} r={15} fill={color ? color : "white"} />
            </G>
            <Path
              d="M20.6129 20.7625L15.1774 15.4433C15.1129 15.3799 15.0673 15.3113 15.0406 15.2375C15.0135 15.1636 15 15.0844 15 15C15 14.9156 15.0135 14.8364 15.0406 14.7625C15.0673 14.6887 15.1129 14.6201 15.1774 14.5567L20.6129 9.22164C20.7634 9.07388 20.9516 9 21.1774 9C21.4032 9 21.5968 9.07916 21.7581 9.23747C21.9194 9.39578 22 9.58047 22 9.79156C22 10.0026 21.9194 10.1873 21.7581 10.3456L17.0161 15L21.7581 19.6544C21.9086 19.8021 21.9839 19.9841 21.9839 20.2002C21.9839 20.4168 21.9032 20.6042 21.7419 20.7625C21.5806 20.9208 21.3925 21 21.1774 21C20.9624 21 20.7742 20.9208 20.6129 20.7625Z"
              fill="#232136"
            />
            <Defs></Defs>
          </Svg>
        </>
      ) : (
        <Svg className="w-full h-full" viewBox="0 0 11 27" fill="none">
          <Path
            d="M8.82 26.466L.28 14.497a1.371 1.371 0 01-.215-.463A2.147 2.147 0 010 13.5c0-.19.021-.368.064-.534.042-.166.113-.32.215-.463L8.82.499C9.057.166 9.353 0 9.707 0c.355 0 .66.178.913.534.253.357.38.772.38 1.247 0 .475-.127.89-.38 1.247L3.168 13.5l7.452 10.472c.236.333.355.742.355 1.229 0 .487-.127.909-.38 1.265-.254.356-.55.534-.888.534-.338 0-.633-.178-.887-.534z"
            fill={color ? color : "#000"}
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

export default BackBtn;
