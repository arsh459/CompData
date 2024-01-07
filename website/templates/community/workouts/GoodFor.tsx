import Divider from "@components/divider/Divider";
import clsx from "clsx";

interface Props {
  heading: string;
  text?: string;
  center?: boolean;
  italic?: boolean;
  noDivider?: boolean;
  textSize?: "xs" | "sm" | "lg";
  headingSize?: "xl" | "lg";
}

const GoodFor: React.FC<Props> = ({
  heading,
  text,
  center,
  italic,
  noDivider,
  textSize,
  headingSize,
}) => {
  return (
    <div>
      <div>
        <p
          className={clsx(
            headingSize ? "text-xl" : "text-lg",
            "text-gray-700 font-semibold ",
            center ? "text-center" : ""
          )}
        >
          {heading}
        </p>
      </div>
      <div>
        <p
          className={clsx(
            " text-gray-500 ",

            textSize === "lg"
              ? "text-lg"
              : textSize === "sm"
              ? "text-sm md:text-sm"
              : "text-xs md:text-xs",
            center ? "text-center" : "",
            italic ? "italic" : ""
          )}
        >
          {text}
        </p>
      </div>
      {noDivider ? null : (
        <div className="pt-4">
          <Divider />
        </div>
      )}
    </div>
  );
};

export default GoodFor;
