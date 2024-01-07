import clsx from "clsx";
import { formLabelValues } from "./constants";
import { DrawerElement } from "./Drawer";

interface Props {
  element: DrawerElement;
  onElementClick: (val: formLabelValues, divId?: string) => void;
  selectedValue: formLabelValues;
}

const DrawerItem: React.FC<Props> = ({
  element,
  onElementClick,
  selectedValue,
}) => {
  return (
    <div
      key={element.text}
      onClick={() => onElementClick(element.value, element.divId)}
      className={clsx(
        "flex items-center",
        "pt-4",
        element.bulletLevel === 1
          ? "pl-4"
          : element.bulletLevel === 2
          ? "pl-6"
          : element.bulletLevel === 3
          ? "pl-8"
          : "pl-12"
      )}
    >
      <p
        className={clsx(
          "text-gray-700 hover:text-orange-500",
          "cursor-pointer",
          element.bulletLevel === 1
            ? "font-semibold text-base"
            : element.bulletLevel === 2
            ? "text-base font-medium"
            : "text-sm font-normal",
          selectedValue === element.value ? "text-orange-500" : ""
        )}
      >
        {element.text}
      </p>
      {element.elementLabel === "todo" && element.bulletLevel === 2 ? (
        <div className="p-1 bg-white shadow-md ml-2 rounded-md">
          <p className="text-gray-500 text-xs">To do</p>
        </div>
      ) : element.elementLabel === "todo" && element.bulletLevel === 3 ? (
        <div className="ml-2 p-1 bg-red-500 rounded-md shadow-md"></div>
      ) : element.elementLabel === "live" ? (
        <div className="ml-2">
          <img
            alt="tick-icon"
            src="./images/done-all-outline.svg"
            className="w-4 h-4 object-cover filter"
          />
        </div>
      ) : null}
    </div>
  );
};

export default DrawerItem;
