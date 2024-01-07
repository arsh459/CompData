import clsx from "clsx";

interface Props {
  value: string;
  active: boolean;
}

const PlaceholderText: React.FC<Props> = ({ value, active }) => {
  return (
    <div className={clsx("rounded-md", "cursor-pointer", "p-2 z-1")}>
      <p className="text-2xl text-gray-500">{value}</p>
    </div>
  );
};

export default PlaceholderText;
