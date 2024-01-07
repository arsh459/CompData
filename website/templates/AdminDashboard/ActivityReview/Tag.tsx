// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

import clsx from "clsx";

interface Props {
  text: string;
  selected?: boolean;
}

const Tag: React.FC<Props> = ({ text, selected }) => {
  return (
    <div
      className={clsx(
        "px-4 py-2 rounded-full bg-gray-100",
        selected ? "border-orange-500 border-2" : ""
      )}
    >
      <p className="text-gray-700 text-center text-sm">{text}</p>
    </div>
  );
};

export default Tag;
