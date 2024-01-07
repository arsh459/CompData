import { leadgenTypes } from "@constants/leadgen";
import clsx from "clsx";

interface Props {
  leadgen: leadgenTypes;
  rounded?: string;
  centered?: boolean;
  featuresHeading?: string;
}

const Features: React.FC<Props> = ({
  leadgen,
  rounded,
  centered,
  featuresHeading,
}) => {
  return (
    <>
      {featuresHeading ? (
        <h2 className="text-4xl md:text-5xl font-bold text-center -mb-10">
          {featuresHeading}
        </h2>
      ) : null}
      <div className="w-full max-w-screen-xl mx-auto grid md:grid-flow-col gap-8 auto-cols-fr p-4 my-20">
        {leadgen.features?.map((feature, index) => (
          <div
            key={`feature-${index + 1}`}
            className={clsx(
              "w-full",
              centered && "flex md:block flex-col justify-center items-center"
            )}
          >
            <img
              src={feature.media}
              alt={`feature ${index + 1} image`}
              className={clsx("w-full aspect-2 object-cover", rounded)}
            />
            <h5 className="text-base md:text-xl font-bold capitalize py-4">
              {feature.title}
            </h5>
            <p
              className={clsx(
                "text-xs md:text-base",
                centered && "text-center md:text-left"
              )}
            >
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
