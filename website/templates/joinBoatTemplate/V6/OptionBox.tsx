import clsx from "clsx";

export type optionType = { key: string; text: string; icon?: string };

interface Props {
  option: optionType;
  onPress: () => void;
  isSelected?: boolean;
  verticle?: boolean;
  reverse?: boolean;
}

const OptionBox: React.FC<Props> = ({
  option,
  onPress,
  isSelected,
  verticle,
  children,
  reverse,
}) => {
  return (
    <button
      onClick={onPress}
      className={clsx(
        isSelected ? "bg-white" : "bg-[#343150]",
        "rounded-2xl flex flex-row items-center p-4",
        verticle ? "w-full h-full" : "w-full"
      )}
    >
      <div
        className={clsx(
          "flex-1 flex items-center",
          reverse
            ? "flex-row-reverse"
            : verticle
            ? "w-full h-full flex-col-reverse aspect-1 justify-end"
            : "flex-row justify-between"
        )}
      >
        <p
          className={clsx(
            "flex-1 font-popL capitalize",
            verticle
              ? "text-sm iphoneX:text-base text-center mt-3"
              : "text-lg iphoneX:text-xl text-start px-3",
            isSelected ? "text-black" : "text-white"
          )}
        >
          {option.text}
        </p>
        {option.icon ? (
          <img
            src={option.icon}
            alt={option.text}
            className={clsx(
              verticle ? "w-3/5" : "w-9 iphoneX:w-10",
              "aspect-1 object-contain"
            )}
          />
        ) : null}
      </div>
      {verticle ? null : children}
    </button>
  );
};

export default OptionBox;
