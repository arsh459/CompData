import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  numChars: number;
  size?: "sm";
}

const MoreText: React.FC<Props> = ({ text, numChars, size }) => {
  const [charsVisible, setCharsVisible] = useState<boolean>(false);
  const [moreVisible, setMoreIsVisible] = useState<"CHECKING" | "YES" | "NO">(
    "CHECKING"
  );

  useEffect(() => {
    if (text.length <= numChars) {
      setMoreIsVisible("NO");
    } else {
      setMoreIsVisible("YES");
    }
  }, [text, numChars]);
  return (
    <div className="">
      <p
        className={clsx(
          size === "sm" ? "text-sm" : "text-base prose",

          "text-gray-500  whitespace-pre-wrap"
        )}
      >
        {text.slice(0, charsVisible ? text.length : numChars)}
        {!charsVisible && moreVisible === "YES" ? "..." : ""}
      </p>
      {moreVisible === "YES" ? (
        <div className="flex justify-end pt-1">
          <p
            onClick={() => setCharsVisible((prev) => !prev)}
            className="text-sm text-orange-500 font-medium underline cursor-pointer"
          >
            {charsVisible ? "Show less" : "Show more"}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default MoreText;
