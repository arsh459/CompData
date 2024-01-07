import { useCallback, useRef } from "react";

export const useNextOnScroll = (callFunc: () => void, canCall: boolean) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((element) => {
          if (element.isIntersecting && canCall) {
            callFunc();
          }
        });
      }, {});

      if (node) observer?.current.observe(node);
    },
    [canCall, callFunc]
  );

  return { targetRef };
};
