import clsx from "clsx";
import BackIcon from "public/icons/BackIcon";

interface Props {
  onBack: () => void;
  title?: string;
  headingCenter?: boolean;
  color?: string;
  classStr?: string;
}

const Header: React.FC<Props> = ({
  onBack,
  title,
  headingCenter,
  color,
  classStr,
}) => {
  return (
    <div className={clsx("w-full flex items-center", classStr)}>
      <div className="cursor-pointer" onClick={onBack}>
        <BackIcon
          style={{
            height: "25",
            width: "25",
            fill: color ? color : "white",
          }}
        />
      </div>
      {title ? (
        <h1
          className={clsx(
            "text-3xl pt-0.5 flex-1 capitalize",
            headingCenter ? "text-center" : "pl-4",
            color ? color : ""
          )}
          style={{ color: color ? color : "#FFFFFF" }}
        >
          {title}
        </h1>
      ) : null}
    </div>
  );
};

export default Header;
