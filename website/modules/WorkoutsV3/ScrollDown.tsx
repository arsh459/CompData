import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useEffect, useState } from "react";

interface Props {
  targetId: string;
}

const ScrollDown: React.FC<Props> = ({ targetId }) => {
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const scrollableElementHeight =
    document.getElementById(targetId)?.clientHeight;

  useEffect(() => {
    if (
      scrollableElementHeight &&
      scrollableElementHeight > window.innerHeight
    ) {
      setIsScrollable(true);

      const changeScroll = () => {
        setIsScrollable(window.pageYOffset === 0);
      };

      window.addEventListener("scroll", changeScroll);

      return () => {
        window.removeEventListener("scroll", changeScroll);
      };
    }
  }, [scrollableElementHeight]);

  const handleScroll = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    weEventTrack("startWorkout_taskPreviewScrollDown", {});
  };

  return (
    <>
      {isScrollable ? (
        <>
          <div className="fixed bottom-0 left-0 right-0 h-40 z-10 bg-gradient-to-t from-black/70 pointer-events-none" />
          <div
            className="w-max mx-auto flex justify-center items-end fixed bottom-0 left-0 right-0 z-20 py-1 cursor-pointer"
            onClick={handleScroll}
          >
            <img
              src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
              alt="Down Arrow"
              className="w-4 animate-bounce"
            />
            <p className="text-white px-2">Scroll Down</p>
            <img
              src={`https://ik.imagekit.io/socialboat/Group_74_qbpWIcqvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651306368189`}
              alt="Down Arrow"
              className="w-4 animate-bounce"
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default ScrollDown;
