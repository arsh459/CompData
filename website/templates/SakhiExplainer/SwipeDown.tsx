import ArrowCountIcon from "@components/SvgIcons/ArrowCountIcon";

const SwipeDown = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p
        className="text-white/70 text-xs iphoneX:text-sm text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Swipe Down
      </p>
      <div className="w-4 iphoneX:w-5 aspect-1 mt-1 iphoneX:mt-2">
        <ArrowCountIcon
          direction="bottom"
          color1="#FFFFFF"
          color2="#FFFFFF"
          color3="#FFFFFF"
          opacity={0.7}
        />
      </div>
    </div>
  );
};

export default SwipeDown;
