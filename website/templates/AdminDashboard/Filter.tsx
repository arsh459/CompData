import clsx from "clsx";

interface Props {
  text: string;
  selected?: boolean;
  onClick: () => void;
}

const Filter: React.FC<Props> = ({ text, selected, onClick }) => {
  return (
    <div className="flex">
      <div
        onClick={onClick}
        className={clsx(
          selected ? "bg-orange-500" : "bg-gray-100",
          "px-8 py-2 rounded-full border shadow-sm cursor-pointer"
        )}
      >
        <p className={clsx(selected ? "font-bold text-white" : "", "text-lg")}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Filter;
