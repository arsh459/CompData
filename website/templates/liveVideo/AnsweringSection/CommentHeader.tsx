// import Divider from "@components/divider/Divider";
import clsx from "clsx";

interface Props {
  numComments: number;
  numUpVotes: number;
  showSave?: boolean;
}

const CommentHeader: React.FC<Props> = ({
  numUpVotes,
  numComments,
  showSave,
}) => {
  return (
    <div className="flex">
      <div
        className={clsx(
          "flex items-center ",
          "cursor-pointer",
          "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
        )}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/socialboat%2Fup.png?alt=media&token=830914d6-04e0-4ff6-a1fa-4fe2cfe527e9"
          className={clsx("object-cover w-4 h-4")}
        />
        <p className="text-xs text-gray-700 pl-0.5 ">{numUpVotes} upvotes</p>
      </div>

      <div
        className={clsx(
          "flex items-center ",
          "cursor-pointer",
          "pl-2",
          "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
        )}
      >
        <img
          src="./images/message-circle-outline.svg"
          className="object-cover w-4 h-4"
        />
        <p className="text-xs text-gray-700 pl-0.5">{numComments} comments</p>
      </div>

      {showSave ? (
        <div
          className={clsx(
            "flex items-center ",
            "cursor-pointer",
            "pl-2",
            "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
          )}
        >
          <img
            src="./images/bookmark-outline.svg"
            className="object-cover w-4 h-4"
          />
          <p className="text-xs text-gray-700 pl-0.5">Save</p>
        </div>
      ) : null}
    </div>
  );
};

export default CommentHeader;
