import clsx from "clsx";

interface Props {
  text: string;
  img: string;
  onClick: () => void;
  size?: "tiny" | "medium";
}

const IconCTA: React.FC<Props> = ({ text, img, onClick, size }) => {
  return (
    <div
      className={clsx(
        size === "tiny" ? "w-4 h-4" : size === "medium" ? "w-6 h-6" : "w-24",
        "flex flex-col justify-center items-center cursor-pointer  hover:shadow-sm rounded-lg"
      )}
      onClick={onClick}
    >
      <img
        src={img}
        className={clsx(
          size === "tiny"
            ? "w-4 h-4"
            : size === "medium"
            ? "w-6 h-6"
            : "w-12 h-12",
          "object-cover"
        )}
      />

      <p className="text-gray-500 text-center text-sm">{text}</p>
    </div>
  );
};

export default IconCTA;
