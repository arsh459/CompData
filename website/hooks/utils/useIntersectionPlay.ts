import { useCallback, useRef } from "react";

const useIntersectionPlay = (shouldPlay: boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const videoRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((element) => {
            if (element.isIntersecting && shouldPlay) {
              const targetEle = element.target as HTMLVideoElement;
              targetEle.play();
            }
            // else {
            //   const targetEle = element.target as HTMLVideoElement;
            //   targetEle.pause();
            // }
          });
        },
        { threshold: 0.75 }
      );

      if (node) observer?.current.observe(node);
    },
    [shouldPlay]
  );

  return { videoRef };
};

export default useIntersectionPlay;
