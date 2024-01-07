import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import IconButton from "@components/button/iconButton";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  item: ListItem;
  onClose: () => void;
  onClick: () => void;
}

const ListItemHolder: React.FC<Props> = ({ item, onClose, onClick }) => {
  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="bg-white cursor-pointer shadow-md p-2 outline  w-44 rounded-md"
      >
        <div className="pt-2 pb-2">
          {item.media ? (
            <div className="pt-4 pb-1">
              <MediaTile
                media={item.media}
                heightString="h-24"
                rounded
                alt="list-item-media"
                width={300}
                height={300}
              />
            </div>
          ) : null}
          <p className="text-gray-700 text-sm font-medium">
            {item.heading ? item.heading : "Add heading"}
          </p>
          <p className="text-gray-500 text-sm line-clamp-1 pt-1">
            {item.text ? item.text : "Add description"}
          </p>
        </div>
      </div>
      <div className="top-1 right-1 absolute">
        <IconButton onClick={onClose} />
      </div>
    </div>
  );
};

export default ListItemHolder;
