import clsx from "clsx";

interface Props {
  text?: string;
  noShadow?: boolean;
}

const LiveLabel: React.FC<Props> = ({ text, noShadow }) => {
  return (
    <div
      className={clsx(
        noShadow ? "bg-gray-100" : "shadow-xl bg-white",
        "flex items-center justify-center p-1 pl-2 pr-3 rounded-xl"
      )}
    >
      <p className="text-sm text-red-500 font-bold">·</p>
      <p className="text-sm font-semibold text-red-500 pl-1">
        {text ? text : "Live"}
      </p>
    </div>
  );
};

export default LiveLabel;
