import clsx from "clsx";

interface Props {
  tag?: string;
  style?: React.CSSProperties;
  isSelected?: boolean;
}
const Tags: React.FC<Props> = ({ tag, style, isSelected }) => {
  // text-[#585858]
  // bg-[#0000001A]
  return (
    <div
      style={style}
      className={clsx(
        " w-fit cursor-pointer text-center rounded-2xl   border border-[#FFFFFFB2]",
        isSelected ? "bg-white" : "bg-[#FFFFFF24]"
      )}
    >
      <p
        className={clsx(
          "font-popR font-medium  text-xs px-6 py-2 whitespace-nowrap ",
          isSelected ? "text-[#585858]" : "text-white"
        )}
      >
        {tag}
      </p>
    </div>
  );
};
export default Tags;
