import { RefObject, useEffect, useState } from "react";

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = "0%" }: IntersectionObserverInit
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry);
      },
      observerParams
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return entry;
};
