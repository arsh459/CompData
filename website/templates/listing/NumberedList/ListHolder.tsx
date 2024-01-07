import clsx from "clsx";
import ListItemView from "./ListItemView";
import { ListItem } from "./NumberedList";

interface Props {
  listItems?: ListItem[];
  vertical?: boolean;
  separator: "bullet" | "tick" | "number" | "none";
  headingSeparateLine?: boolean;
  viewStyle?: "mobile" | "desktop";
  paddingString?: string;
}

const ListHolder: React.FC<Props> = ({
  viewStyle,
  listItems,
  vertical,
  separator,
  headingSeparateLine,
  paddingString,
}) => {
  // console.log("vertical", paddingString);
  return (
    <>
      {listItems &&
        listItems.map((listItem, index) => {
          return (
            <div
              key={`${listItem.heading}-${index}`}
              className={clsx(
                // "pb-8",
                // "bg-red-50",
                vertical && paddingString
                  ? `${paddingString} w-full`
                  : vertical
                  ? "pb-4 w-full"
                  : viewStyle === "mobile"
                  ? "pb-4 w-full"
                  : "w-full md:w-1/2 pb-8"
                // viewStyle !== "mobile" && !vertical && index % 2 === 1 ? "" : ""
              )}
            >
              <ListItemView
                separator={separator}
                item={listItem}
                index={index + 1}
                headingSeparateLine={headingSeparateLine}
              />
            </div>
          );
        })}
    </>
  );
};

export default ListHolder;
