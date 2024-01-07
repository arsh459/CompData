import clsx from "clsx";

interface Props {
  icon: string;
  selectedIcon: string;
  text: string;
  selected?: boolean;
  kpi?: number;
  selectedText?: string;
  // onClick: () => void;
}

const Submit: React.FC<Props> = ({
  text,
  icon,
  selected,
  kpi,
  selectedIcon,
  selectedText,
}) => {
  return (
    <div className="flex justify-end cursor-pointer">
      <div className="flex items-center">
        {kpi ? <p className="text-sm text-orange-500 pr-2">{kpi}</p> : null}
        <img
          alt="tick"
          className="w-6 h-6 object-cover"
          src={selected ? selectedIcon : icon}
        />
        <p
          className={clsx(
            " text-xs pl-2",
            selected ? "text-gray-700 font-bold" : "text-gray-500 font-medium"
          )}
        >
          {selected && selectedText ? selectedText : text}
        </p>
      </div>
    </div>
  );
};

export default Submit;
