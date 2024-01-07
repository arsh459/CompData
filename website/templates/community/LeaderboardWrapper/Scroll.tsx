import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  targetId: string;
}

const Scroll: React.FC<Props> = ({ targetId }) => {
  const elementScrollTop = document.getElementById(targetId)?.scrollTop;
  const [scrollTopVal, setScrollTopVal] = useState<number>(
    elementScrollTop ? elementScrollTop : 0
  );
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element) {
      setIsScrollable(element.scrollHeight > element.clientHeight);
      // if (element.scrollHeight > element.clientHeight) {
      // }

      const changeScroll = () => {
        setIsScrollable(
          element.scrollHeight - element.scrollTop !== element.clientHeight
        );
      };

      element.addEventListener("scroll", changeScroll);

      return () => {
        element.removeEventListener("scroll", changeScroll);
      };
    }
  }, [targetId, scrollTopVal]);

  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollTop += 80;
      setScrollTopVal(element.scrollTop);
    }
  };

  return (
    <div className="flex justify-center items-center h-5">
      <div
        className={clsx(
          "flex items-end cursor-pointer",
          !isScrollable && "hidden"
        )}
        onClick={handleScroll}
      >
        <img
          src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
          alt="Down Arrow"
          className="w-2.5 animate-bounce"
        />
        <p className="text-white text-xs px-2">Scroll Down</p>
        <img
          src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
          alt="Down Arrow"
          className="w-2.5 animate-bounce"
        />
      </div>
    </div>
  );
};

export default Scroll;
