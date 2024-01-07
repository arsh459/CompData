import clsx from "clsx";

interface Props {
  text: string;
  color: string;
}

const LabelTag: React.FC<Props> = ({ text, color }) => {
  return (
    <div className={clsx(color ? color : "", "px-2 py-1 rounded-lg shadow-sm")}>
      <p className="text-xs text-white">{text}</p>
    </div>
  );
};

export default LabelTag;
