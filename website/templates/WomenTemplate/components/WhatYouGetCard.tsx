import clsx from "clsx";

interface Props {
  imgUri: string;
  children: React.ReactNode;
  subText?: string;
  gradientText?: string;
  isReverse?: boolean;
  alt?: string;
  backgroundColor?: string;
}

const WhatYouGetCard: React.FC<Props> = ({
  imgUri,
  subText,
  children,
  gradientText,
  isReverse,
  alt,
  backgroundColor,
}) => {
  return (
    <div
      className={clsx(
        "mb-12 p-4 flex items-center justify-center group md:flex-col",
        isReverse && "flex-row-reverse"
      )}
    >
      <div className="relative z-0 overflow-visible w-36 sm:w-40 lg:w-44 aspect-1 flex justify-center items-center">
        <div
          className={clsx(
            gradientText ? gradientText : "",
            "absolute inset-0 -z-10 p-4 rounded-full backdrop-blur blur-2xl group-hover:scale-100 scale-0 transition-all"
          )}
          style={{ backgroundColor }}
        />
        <img
          src={imgUri}
          className="w-full h-full object-contain"
          alt={alt || ""}
        />
      </div>
      <div className="h-4 w-4 md:mb-8" />
      <div className="flex-1 flex flex-col">
        {children}
        <p className="text-xs font-bair text-[#FFFFFFBF] ">{subText}</p>
      </div>
    </div>
  );
};

export default WhatYouGetCard;
