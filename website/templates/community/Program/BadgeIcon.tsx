import clsx from "clsx";

interface Props {
  text: string;
  color: string;
}

const BadgeIcon: React.FC<Props> = ({ text, color }) => {
  return (
    <div className={clsx(color, "px-2 py-1 rounded-xl")}>
      <p className="text-white font-bold text-sm">{text}</p>
    </div>
  );
};
export default BadgeIcon;
