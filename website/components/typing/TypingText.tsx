import Typed from "typed.js";
import { useEffect, useRef } from "react";

interface Props {
  strings: string[];
  preStringTyped: (num: number) => void;
}

const TypingText: React.FC<Props> = ({ strings, preStringTyped }) => {
  // Create Ref element.
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: strings, // Strings to display
        // Speed settings, try diffrent values untill you get good results
        startDelay: 100,
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 300,
        loop: true,
        // shuffle: true,
        smartBackspace: true,
        showCursor: false,
        preStringTyped: preStringTyped,
      });

      // Destropying
      return () => {
        typed.destroy();
      };
    }
  }, [strings, preStringTyped]);

  return (
    <div className="min-h-[50px] lg:min-h-[60px]">
      <span
        ref={el}
        className="text-5xl lg:text-6xl text-orange-500 font-extrabold"
      ></span>
    </div>
  );
};

export default TypingText;
