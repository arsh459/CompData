import clsx from "clsx";

interface Props {
  heading: string;
  subtitle: string;
  textLeft?: boolean;
}

const Heading: React.FC<Props> = ({ heading, subtitle, textLeft }) => {
  return (
    <div className={clsx(textLeft ? "" : "flex justify-center")}>
      <div>
        <div>
          <p
            className={clsx(
              "text-gray-700",
              textLeft
                ? "text-left text-3xl font-semibold"
                : "text-center text-5xl md:text-6xl font-medium"
            )}
          >
            {heading}
          </p>
        </div>
        <div>
          <p
            className={clsx(
              "text-gray-500",
              textLeft ? "text-left text-xl" : "text-center text-2xl"
            )}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
