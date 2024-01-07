import Button from "@components/button";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  onGetStarted?: () => void;
  disabled?: boolean;
  text?: string;
  bgColor?: string;
}

const GetStarted: React.FC<Props> = ({
  disabled,
  onGetStarted,
  text,
  bgColor,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  // const scaleX = useRef(new Animated.Value(0.9)).current;
  // const scaleY = useRef(new Animated.Value(0.6)).current;
  // const opacity = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.timing(scaleX, {
  //       toValue: 1.15,
  //       duration: 1500,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  //   Animated.loop(
  //     Animated.timing(scaleY, {
  //       toValue: 1.3,
  //       duration: 1500,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  //   Animated.loop(
  //     Animated.timing(opacity, {
  //       toValue: 0,
  //       duration: 1500,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  // }, [scaleX, scaleY, opacity]);

  // useEffect(() => {
  //   setClicked(false);
  // });

  return (
    <div className="relative z-0">
      <Button
        className={clsx(
          "rounded-full px-4 py-3 m-4",
          clicked || disabled ? "bg-[#757575]" : "bg-white",
          !onGetStarted && "opacity-0"
        )}
        style={bgColor ? { backgroundColor: bgColor } : {}}
        onClick={() => {
          if (onGetStarted) {
            onGetStarted();
            setClicked(true);
          }
        }}
        disabled={disabled || clicked}
        appearance={"outline"}
      >
        <p
          className="text-[#100F1A] text-base iphoneX:text-xl text-center"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {text ? text : "Get Started"}
        </p>
      </Button>
      {/* <Animated.View
        className="absolute inset-0 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 0.5,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      />
      <Animated.View
        className="absolute inset-1 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 0.75,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      />
      <Animated.View
        className="absolute inset-2 -z-10 border-white rounded-full"
        style={{
          transform: [{ scaleX }, { scaleY }],
          opacity,
          borderWidth: 1,
          borderColor: bgColor ? bgColor : "#fff",
        }}
      /> */}
    </div>
  );
};

export default GetStarted;
