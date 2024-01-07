import clsx from "clsx";

interface Props {
  whyApplyArr?: { icon: string; text: string }[];
  gridStyle?: string;
  textChild?: React.ReactNode;
  imgStyle?: string;
  cardStyle?: string;
  textStyle?: string;
}
const WhyApply: React.FC<Props> = ({
  whyApplyArr,
  gridStyle,
  textChild,
  imgStyle,
  cardStyle,
  textStyle,
}) => {
  return (
    <>
      <div
        className={clsx(
          "w-screen  md:h-screen z-[9999] flex flex-col justify-center items-center "
        )}
      >
        <>
          <div
            className={clsx(
              gridStyle
                ? gridStyle
                : "mx-auto grid grid-cols-1 md:grid-cols-4 auto-cols-max justify-center items-center p-4 gap-8  "
            )}
          >
            {whyApplyArr?.map((item) => (
              <div
                key={item.icon}
                className={clsx(
                  cardStyle
                    ? cardStyle
                    : "bg-[#0000004D] w-full rounded-3xl flex-1   p-4 flex flex-col items-center "
                )}
              >
                <img
                  key={item.icon}
                  src={item.icon}
                  className={
                    imgStyle
                      ? imgStyle
                      : "object-contain mx-auto max-w-[140px] aspect-1 "
                  }
                  loading="lazy"
                  alt={`icon for ${item.text}`}
                />
                <p
                  className={
                    textStyle
                      ? textStyle
                      : "font-bair  text-center text-sm sm:text-base lg:text-lg   w-4/5 md:w-full lg:w-3/5  text-[#E7E7E7] "
                  }
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          {textChild}
        </>
      </div>
    </>
  );
};

export default WhyApply;
