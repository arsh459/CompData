import clsx from "clsx";
import { useState } from "react";
import Linkify from "react-linkify";

interface Props {
  text?: string;
  numChars?: number;
  classStr?: string;
  classStrBtn?: string;
}

const ShowMore: React.FC<Props> = ({
  text,
  numChars,
  classStr,
  classStrBtn,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return text ? (
    <p
      className={clsx(
        "whitespace-pre-wrap prose break-words",
        classStr ? classStr : "text-lg"
      )}
    >
      <Linkify>
        {text.length < (numChars ? numChars : 100) ? (
          text
        ) : (
          <>
            {showMore
              ? text
              : `${text.substring(0, numChars ? numChars : 75)}...`}
            <button
              className={clsx(classStrBtn ? classStrBtn : "text-blue-500")}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </>
        )}
      </Linkify>
    </p>
  ) : null;
};

export default ShowMore;
