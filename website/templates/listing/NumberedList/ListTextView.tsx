import clsx from "clsx";
import { ListItem } from "./NumberedList";

interface Props {
  item: ListItem;
  index: number;
  separator: "bullet" | "tick" | "number" | "none";
  headingSeparateLine?: boolean;
}

const ListTextView: React.FC<Props> = ({
  item,
  index,
  separator,
  headingSeparateLine,
}) => {
  // console.log("item", item);
  return (
    <div className="">
      <div className={clsx("flex")}>
        {separator === "bullet" ? (
          <div className="p-2 justify-center">
            <div className="bg-gray-700 w-2 h-2 rounded-full" />
          </div>
        ) : separator === "tick" ? (
          <img
            alt="tick-icon"
            src="/images/done-all-outline.svg"
            className="w-6 h-6 object-cover filter pr-1"
          />
        ) : separator === "number" ? (
          <div className="p-2 pt-0 pr-1">
            <p className="text-gray-700 font-medium">{index}.</p>
          </div>
        ) : null}
        {headingSeparateLine ? (
          <div>
            <p
              className={clsx(
                separator === "none" ? "" : "pl-2",
                "text-gray-700 text-base break-words prose-2xl"
              )}
            >
              <strong>{item.heading}</strong>
            </p>
            <p
              className={clsx(
                separator === "none" ? "" : "pl-2",
                "whitespace-pre-wrap",
                "text-gray-700 text-base break-words prose-2xl"
              )}
            >
              {item.text}
            </p>
          </div>
        ) : item.heading || item.text ? (
          <p
            className={clsx(
              separator === "none" ? "" : "pl-2",
              "text-gray-700 text-base break-words prose-2xl"
            )}
          >
            {item.heading ? <strong>{item.heading}:</strong> : null} {item.text}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ListTextView;
