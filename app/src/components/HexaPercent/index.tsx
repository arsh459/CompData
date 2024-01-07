import { View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import Animated from "react-native-reanimated";
import { useHexaValue } from "./hook/useHexaValue";
import { memo } from "react";
// import { memo } from "react";
// import { memo, useRef } from "react";
// import { Text } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  percent: number;
  rounded?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  hideInactive?: boolean;
  hideBGFill?: boolean;
  hideWaterMark?: boolean;
  noAnimation?: boolean;
  width: number;
  base?: number;
  height: number;
  bgFillOpacity?: number;
  children?: React.ReactNode;
}

const HexaPercent: React.FC<Props> = ({
  width,
  height,
  percent,
  rounded,
  activeColor,
  inActiveColor,
  hideInactive,
  hideBGFill,
  hideWaterMark,
  noAnimation,
  bgFillOpacity,
  children,
}) => {
  const { animatedProps, pathLength, pathRef, onLayout, rendered } =
    useHexaValue({
      percent,
      noAnimation,
    });
  const bgFillOpacityLocal = bgFillOpacity
    ? bgFillOpacity > 1
      ? 1
      : bgFillOpacity < 0
      ? 0
      : bgFillOpacity
    : 1;

  // const renders = useRef<number>(0);

  return (
    <View style={{ width: width, height: height }} className="relative z-0">
      <Svg fill="none" className="w-full h-full" viewBox="0 0 126 126">
        <Path
          d="M53.34 5.577c3.556-2.053 5.334-3.08 7.227-3.471a12 12 0 014.866 0c1.893.392 3.671 1.418 7.227 3.471l35.24 20.346c3.556 2.053 5.333 3.08 6.619 4.522a11.999 11.999 0 012.434 4.215c.607 1.835.607 3.888.607 7.994v40.692c0 4.106 0 6.159-.607 7.994a11.999 11.999 0 01-2.434 4.215c-1.286 1.443-3.063 2.47-6.619 4.522l-35.24 20.346c-3.556 2.053-5.334 3.079-7.227 3.471a11.98 11.98 0 01-4.866 0c-1.893-.392-3.671-1.418-7.227-3.471L18.1 100.077c-3.556-2.053-5.334-3.08-6.62-4.522a12 12 0 01-2.433-4.215c-.607-1.835-.607-3.888-.607-7.994V42.654c0-4.106 0-6.159.607-7.994a12 12 0 012.434-4.215c1.286-1.443 3.063-2.47 6.62-4.522L53.34 5.577z"
          fill={hideBGFill ? "none" : "url(#prefix__paint_linear)"}
        />
        <Path
          d="M86.157 62.492c0-.63-.188-1.245-.54-1.77a3.204 3.204 0 00-1.441-1.172 3.234 3.234 0 00-3.498.69 3.162 3.162 0 00-.696 3.47 3.19 3.19 0 001.182 1.43 3.227 3.227 0 004.053-.396c.602-.597.94-1.407.94-2.252zm-29.32-18.14a3.2 3.2 0 00-1.36-1.264 3.232 3.232 0 00-3.535.462 3.16 3.16 0 00-.923 3.418c.203.597.581 1.12 1.085 1.503a3.225 3.225 0 003.559.231 3.188 3.188 0 001.495-1.933 3.163 3.163 0 00-.32-2.417zm0 36.28a3.165 3.165 0 00-.232-3.53 3.21 3.21 0 00-1.515-1.078 3.234 3.234 0 00-3.445.916 3.162 3.162 0 00-.466 3.508c.28.566.724 1.035 1.274 1.35a3.232 3.232 0 002.436.318 3.206 3.206 0 001.949-1.484zm8.96 9.28a15.63 15.63 0 003.76-6.724c.547-2.05.667-4.184.359-6.273-.124-.842.243-1.7.99-2.107.707-.385 1.573-.268 2.209.226a16.069 16.069 0 006.27 2.973c2.728.626 5.575.53 8.255-.276 2.68-.807 5.1-2.297 7.019-4.321a15.85 15.85 0 003.914-7.217c.557-2.355.57-4.803.037-7.163a15.957 15.957 0 00-8.693-10.891 16.085 16.085 0 00-6.97-1.57 15.901 15.901 0 00-9.866 3.424c-.63.499-1.499.617-2.202.227-.725-.402-1.083-1.237-.963-2.058a15.77 15.77 0 00-.511-6.84 15.869 15.869 0 00-4.354-6.995 16.054 16.054 0 00-7.294-3.9 16.136 16.136 0 00-8.283.24 16.178 16.178 0 00-6.27 3.551 16.016 16.016 0 00-4.085 5.908 15.718 15.718 0 00.476 12.721 15.845 15.845 0 004.008 5.147 15.976 15.976 0 004.426 2.652c.774.307 1.32 1.036 1.307 1.868-.013.807-.55 1.503-1.3 1.801A15.972 15.972 0 0041.14 69.6a15.78 15.78 0 00-3.138 9.428 15.895 15.895 0 003.186 9.526 16.104 16.104 0 008.283 5.761 16.01 16.01 0 008.802.134 15.912 15.912 0 007.524-4.535zm-14.429-1.68a9.67 9.67 0 01-3.774-2.1 9.572 9.572 0 01-2.47-3.523 9.505 9.505 0 01.595-8.346 9.504 9.504 0 015.473-4.306 6.4 6.4 0 003.313-2.285 6.318 6.318 0 001.277-3.798v-2.767a6.321 6.321 0 00-1.278-3.797 6.405 6.405 0 00-3.312-2.286 9.587 9.587 0 01-3.436-1.876 9.5 9.5 0 01-2.388-3.086 9.431 9.431 0 01-.272-7.611 9.561 9.561 0 014.777-5.134 9.677 9.677 0 017.022-.523 9.593 9.593 0 015.495 4.37 9.467 9.467 0 011.015 6.914 6.218 6.218 0 00.345 3.962A6.282 6.282 0 0066.43 55l2.42 1.388a6.447 6.447 0 007.604-.895 9.582 9.582 0 013.356-2.016 9.637 9.637 0 017.657.572 9.55 9.55 0 013.014 2.492 9.481 9.481 0 012.097 6.658 9.502 9.502 0 01-3.035 6.292 9.648 9.648 0 01-6.541 2.557 9.649 9.649 0 01-6.545-2.548 6.462 6.462 0 00-7.608-.901l-2.417 1.385a6.305 6.305 0 00-2.677 2.96 6.24 6.24 0 00-.35 3.963 9.445 9.445 0 01-.14 4.913 9.503 9.503 0 01-2.593 4.188 9.615 9.615 0 01-4.352 2.346 9.665 9.665 0 01-4.952-.122z"
          fillOpacity={hideWaterMark ? 0 : 0.05}
          fill="#000"
        />
        <Path
          ref={pathRef}
          onLayout={onLayout}
          d="M71.16 8.175l35.24 20.346c3.734 2.156 4.991 2.923 5.879 3.92a8.998 8.998 0 011.825 3.161c.42 1.268.456 2.74.456 7.052v40.692c0 4.311-.036 5.784-.456 7.052a8.998 8.998 0 01-1.825 3.16c-.888.998-2.145 1.765-5.879 3.921l-35.24 20.346c-3.734 2.156-5.028 2.861-6.335 3.132a9.012 9.012 0 01-3.65 0c-1.307-.271-2.6-.976-6.335-3.132L19.6 97.479c-3.734-2.156-4.991-2.923-5.88-3.92a9 9 0 01-1.824-3.161c-.42-1.268-.456-2.74-.456-7.052V42.654c0-4.312.036-5.784.456-7.052a9 9 0 011.825-3.16c.888-.998 2.145-1.765 5.88-3.921L54.84 8.175c3.734-2.156 5.028-2.86 6.335-3.132a9 9 0 013.65 0c1.307.271 2.6.976 6.335 3.132z"
          stroke={inActiveColor ? inActiveColor : "#DFDFDF"}
          strokeOpacity={hideInactive ? 0 : 1}
          strokeWidth={6}
          strokeLinecap={rounded ? "round" : "square"}
        />
        {rendered ? (
          <AnimatedPath
            d="M71.16 8.175l35.24 20.346c3.734 2.156 4.991 2.923 5.879 3.92a8.998 8.998 0 011.825 3.161c.42 1.268.456 2.74.456 7.052v40.692c0 4.311-.036 5.784-.456 7.052a8.998 8.998 0 01-1.825 3.16c-.888.998-2.145 1.765-5.879 3.921l-35.24 20.346c-3.734 2.156-5.028 2.861-6.335 3.132a9.012 9.012 0 01-3.65 0c-1.307-.271-2.6-.976-6.335-3.132L19.6 97.479c-3.734-2.156-4.991-2.923-5.88-3.92a9 9 0 01-1.824-3.161c-.42-1.268-.456-2.74-.456-7.052V42.654c0-4.312.036-5.784.456-7.052a9 9 0 011.825-3.16c.888-.998 2.145-1.765 5.88-3.921L54.84 8.175c3.734-2.156 5.028-2.86 6.335-3.132a9 9 0 013.65 0c1.307.271 2.6.976 6.335 3.132z"
            stroke={activeColor ? activeColor : "#FFFFFF"}
            strokeWidth={6}
            strokeLinecap={rounded ? "round" : "square"}
            strokeDasharray={pathLength}
            animatedProps={animatedProps}
          />
        ) : null}
        <Defs>
          <LinearGradient
            id="prefix__paint_linear"
            x1={52.5}
            y1={9.5}
            x2={67}
            y2={133}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#6D55D1" stopOpacity={bgFillOpacityLocal} />
            <Stop
              offset={1}
              stopColor="#6745F5"
              stopOpacity={bgFillOpacityLocal}
            />
          </LinearGradient>
        </Defs>
      </Svg>
      {children ? (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 z-10 flex justify-center items-center"
          style={{ padding: 0 }}
        >
          {children}
          {/* <Text className="text-white">{renders.current++}</Text> */}
        </View>
      ) : null}
    </View>
  );
};

// export default HexaPercent;

export default memo(HexaPercent, (prev, now) => {
  return (
    // prev.base === now.base &&
    prev.percent === now.percent && prev.width === now.width
  );
});
