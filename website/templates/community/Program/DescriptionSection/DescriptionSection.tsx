import clsx from "clsx";
import { useState } from "react";
import NextButton from "../NextButton";

interface Props {
  desc?: string;
  heading?: boolean;
}

const DescriptionSection: React.FC<Props> = ({ desc, heading }) => {
  const [showMore, setShowMore] = useState<boolean>(true);

  return (
    <div>
      {heading ? (
        <p className="text-xl md:text-2xl font-semibold text-gray-700 text-left">{`What's the challenge?`}</p>
      ) : null}
      {/* <Link href={`events/${selectedEvent?.eventKey}`} target="_blank"> */}
      <p
        className={clsx(
          "text-left text-gray-700 prose whitespace-pre-wrap ",
          showMore ? "line-clamp-6" : ""
        )}
      >
        {desc}
      </p>

      <div className="mt-2 bg-white">
        <NextButton
          text={showMore ? "Show more" : "Show less"}
          onClick={() => setShowMore((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default DescriptionSection;
