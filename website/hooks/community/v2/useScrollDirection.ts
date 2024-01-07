import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [direction, setDirection] = useState<"scroll-up" | "scroll-down">(
    "scroll-up"
  );

  useEffect(() => {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll - lastScroll >= 10) {
        setDirection("scroll-down");
      } else if (lastScroll - currentScroll >= 10) {
        setDirection("scroll-up");
      }

      lastScroll = currentScroll;
    });
  }, []);

  return {
    isScrolledDown: direction === "scroll-down",
  };
};
