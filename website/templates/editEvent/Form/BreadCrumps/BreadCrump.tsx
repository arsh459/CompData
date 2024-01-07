import clsx from "clsx";

export interface BreadCrumpProps {
  heading: string;
  next: boolean;
  onClick: () => void;
  truncate?: boolean;
}

const BreadCrump: React.FC<BreadCrumpProps> = ({
  heading,
  next,
  onClick,
  truncate,
}) => {
  return (
    <div onClick={onClick} className="flex items-center cursor-pointer">
      <p
        className={clsx(
          "text-gray-700",
          // "bg-red-50",
          "mr-1",
          next ? "underline" : "",
          truncate ? "truncate line-clamp-1" : ""
        )}
      >
        {heading}
      </p>
      {next ? (
        <div>
          <img
            src="./images/arrow-ios-forward-outline.svg"
            className="w-4 h-4 object-cover"
          />
        </div>
      ) : null}
    </div>
  );
};

export default BreadCrump;
