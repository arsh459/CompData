import { getHeight } from "@templates/community/Program/getAspectRatio";
import clsx from "clsx";
import MediaTile from "../HeaderImage/MediaTile";
import ListTextView from "./ListTextView";
import { ListItem } from "./NumberedList";

interface Props {
  item: ListItem;
  index: number;
  imgPos?: "top" | "left" | "right";
  separator: "bullet" | "tick" | "number" | "none";
  headingSeparateLine?: boolean;
}

const ListItemView: React.FC<Props> = ({
  item,
  index,
  imgPos,
  separator,
  headingSeparateLine,
}) => {
  // console.log("media", item.media);
  return (
    <div className="md:p-2">
      {item.media ? (
        <div className="aspect-w-16 aspect-h-9 shadow-md rounded-md">
          {/* <img
            src={item.media.secure_url}
            alt="media"
            className="object-cover w-full h-full"
          /> */}
          <MediaTile
            media={item.media}
            rounded={true}
            alt={item.text}
            widthString="w-full"
            heightString="h-full"
            // heightString="h-[320px] md:h-[200px]"
            width={400}
            height={getHeight(item.media, 400)}
          />
        </div>
      ) : null}
      {item.text || item.heading ? (
        <div className={clsx(item.media ? "pt-1" : "")}>
          <ListTextView
            headingSeparateLine={headingSeparateLine}
            index={index}
            item={item}
            separator={separator}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ListItemView;
