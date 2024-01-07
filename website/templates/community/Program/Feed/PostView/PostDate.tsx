import clsx from "clsx";

interface Props {
  date: number;
  size?: "small" | "large" | "xs" | "medium";
}

const PostDate: React.FC<Props> = ({ date, size }) => {
  return (
    <div className="">
      <p
        className={clsx(
          "text-gray-500",
          size === "small" ? "text-xs" : " text-sm"
        )}
      >
        {new Date(date).toLocaleDateString("default", {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          weekday: "short",
          hour12: true,
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default PostDate;
