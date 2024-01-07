import clsx from "clsx";

interface Props {
  img: string;
  text: string;
  selected?: boolean;
  selectedImg: string;
  onClick: () => void;
}

const PostButton: React.FC<Props> = ({
  img,
  text,
  selected,
  selectedImg,
  onClick,
}) => {
  return (
    // <div className="pr-2">
    <div
      onClick={onClick}
      className={clsx(
        "cursor-pointer flex items-center justify-center",
        "px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md border",
        selected ? "underline" : "",
        "min-w-[100px] mr-1"
      )}
    >
      <div className="flex-none block">
        <img
          className="w-4 h-4 object-cover"
          alt={text}
          src={selected ? selectedImg : img}
        />
      </div>
      <div className="flex-none  ">
        <p
          className={clsx(
            "text-xs",
            "text-left",
            "line-clamp-1",
            "pl-2",
            "break-all",

            selected ? "text-gray-900 font-bold" : "text-gray-700 font-medium"
          )}
        >
          {text}
        </p>
      </div>

      {/* <div className="w-2" /> */}
    </div>
    // </div>
  );
};

export default PostButton;
