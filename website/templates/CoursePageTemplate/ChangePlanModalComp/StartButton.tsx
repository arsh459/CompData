import clsx from "clsx";

interface Props {
  bgColor?: string;
  textColor?: string;
  title?: string;
  textStyle?: string;
  onPress?: () => void;
  roundedStr?: string;
  fontFamily?: string;
  startColor?: string;
  endColor?: string;
  children?: React.ReactNode;
}

const StartButton: React.FC<Props> = ({
  bgColor,
  textColor,
  title,
  onPress,
  textStyle,
  roundedStr,
  fontFamily,
  startColor,
  endColor,
  children,
}) => {
  return (
    <div
      onClick={onPress}
      className={clsx(roundedStr ? roundedStr : "rounded-lg")}
      style={{
        background: `linear-gradient(90deg, ${
          startColor || "transparent"
        } 0%, ${endColor || "transparent"} 100%)`,
      }}
    >
      <div className={clsx(roundedStr ? roundedStr : "rounded-lg", bgColor)}>
        {children ? (
          children
        ) : (
          <p
            style={{
              fontFamily: fontFamily ? fontFamily : "BaiJamjuree-Medium",
            }}
            className={clsx(textColor ? textColor : "", textStyle)}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
};

export default StartButton;
