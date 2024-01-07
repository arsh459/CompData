import clsx from "clsx";

interface Props {
  text: string;
  onClick: () => void;
  selected?: boolean;
  newLabel?: boolean;
}

const ProgramTile: React.FC<Props> = ({
  selected,
  onClick,
  text,
  newLabel,
}) => {
  return (
    <div className="cursor-pointer flex items-center " onClick={onClick}>
      <p
        className={clsx(
          selected ? "underline font-medium text-gray-700" : "text-gray-500",
          "text-lg md:text-xl lg:text-2xl  italic"
        )}
      >
        {text}
      </p>
      {newLabel ? (
        <div className="pl-2">
          <div className="px-2 py-1 bg-green-500 rounded-lg shadow-sm">
            <p className="text-xs text-white">New</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProgramTile;
