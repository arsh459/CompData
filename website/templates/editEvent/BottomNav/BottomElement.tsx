import clsx from "clsx";
import { ButtonElement } from "./BottomNav";

const BottomElement: React.FC<ButtonElement> = ({
  name,
  icon,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(name)}
      className={clsx(
        !selected ? "bg-white shadow-2xl" : "bg-orange-500 shadow-inner",
        "p-5 m-2 rounded-xl",
        "flex justify-center cursor-pointer items-center"
      )}
    >
      {icon ? <img src={icon} className="w-6 h-6 object-cover" /> : null}
      <p
        className={clsx(
          selected ? "text-white" : "text-gray-700 ",
          "text-xl pl-2"
        )}
      >
        {name}
      </p>
    </div>
  );
};

export default BottomElement;
