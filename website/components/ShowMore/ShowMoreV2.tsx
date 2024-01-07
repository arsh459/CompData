import { useCallback, useState } from "react";
import clsx from "clsx";
import Linkify from "react-linkify";

interface Props {
  id: string;
  text: string;
  bgColor?: string;
  classStr?: string;
}

const ShowMoreV2: React.FC<Props> = ({ id, text, bgColor, classStr }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);

  const targetEle = useCallback((node) => {
    if (node !== null) {
      if (node.scrollHeight > node.clientHeight) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  }, []);

  return (
    <div
      ref={targetEle}
      id={`TargetShowMoreElement-${id}`}
      className={clsx(
        "flex-1 relative z-0",
        bgColor ? bgColor : "bg-white",
        classStr ? classStr : "bg-white",
        showText ? "overflow-y-auto" : "overflow-y-hidden"
      )}
    >
      <p className="w-full h-full whitespace-pre-wrap prose">
        <Linkify>{text}</Linkify>
        {showMore && showText ? (
          <button
            className="text-blue-500 whitespace-nowrap cursor-pointer"
            onClick={() => {
              const target = document.getElementById(
                `TargetShowMoreElement-${id}`
              );
              if (target) {
                target.scrollTop = 0;
                setShowText(false);
              }
            }}
          >
            ...ShowLess
          </button>
        ) : null}
      </p>
      {showMore && !showText ? (
        <button
          className={clsx(
            "absolute right-0 bottom-0 z-10 text-blue-500 whitespace-nowrap cursor-pointer",
            bgColor ? bgColor : "bg-white"
          )}
          onClick={() => setShowText(true)}
        >
          ...ShowMore
        </button>
      ) : null}
    </div>
  );
};

export default ShowMoreV2;
