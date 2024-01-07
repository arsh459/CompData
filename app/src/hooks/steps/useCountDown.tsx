import { useEffect, useState } from "react";

export const useCountDown = (start: number) => {
  const [counter, setCounter] = useState(start);

  // useEffect(() => {

  // }, [])

  useEffect(() => {
    if (counter === 0) {
      return;
    }
    const id = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [counter]);
  return {
    counter,
  };
};
