import clsx from "clsx";

interface Props {
  name?: string;
  textSize: "base" | "2xl" | "lg";
  font: "medium" | "normal";
}

const HeaderItem: React.FC<Props> = ({ font, name, textSize }) => {
  return (
    <p
      className={clsx(
        font === "medium" ? "font-medium" : "",
        textSize === "2xl" ? "text-2xl" : textSize === "lg" ? "text-lg" : "",
        "text-gray-700 hover:text-orange-500 cursor-pointer"
      )}
    >
      {name}
    </p>
  );
};

export default HeaderItem;
