import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const helperFunc = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    helperFunc();

    window.addEventListener("resize", helperFunc);

    return () => {
      window.removeEventListener("resize", helperFunc);
    };
  }, []);

  return { width, height };
};

export default useWindowDimensions;
