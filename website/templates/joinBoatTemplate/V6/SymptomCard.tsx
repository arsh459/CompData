import TickCheck from "@components/SvgIcons/TickCheck";

interface Props {
  item: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
  textColor?: string;
  tagColor?: string;
}

const SymptomCard: React.FC<Props> = ({
  onClick,
  item,
  image,
  isSelected,
  textColor,
  tagColor,
}) => {
  const contentColor = tagColor || "#3ACFFF";
  return (
    <button onClick={onClick} className="relative z-0">
      <div
        className="flex flex-row items-center px-4 py-2 m-2 border-2 rounded-full"
        style={{
          backgroundColor:
            image === "NO_IMG" ? "#FF3A8D40" : `${contentColor}40`,
          borderColor: isSelected
            ? image === "NO_IMG"
              ? "#FF3A8D"
              : contentColor
            : "#FFFFFF00",
        }}
      >
        {image === "NO_IMG" ? null : (
          <img src={image} className="w-6 h-6 object-contain mr-1" />
        )}
        <p
          className="text-sm iphoneX:text-base capitalize"
          style={{
            fontFamily: "Nunito-Medium",
            color: textColor ? textColor : "#FFFFFF",
          }}
        >
          {item}
        </p>
      </div>
      {isSelected ? (
        <div
          className="absolute bottom-2 right-2 rounded-full flex justify-center items-center w-4 aspect-1"
          style={{
            backgroundColor: image === "NO_IMG" ? "#FF3A8D" : contentColor,
          }}
        >
          <div className="w-full p-1">
            <TickCheck color={"#000"} />
          </div>
        </div>
      ) : null}
    </button>
  );
};

export default SymptomCard;
