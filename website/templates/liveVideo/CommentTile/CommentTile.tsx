import clsx from "clsx";
import CommentHeader from "../AnsweringSection/CommentHeader";
import { QuestionProps } from "../QuestionTile/QuestionTile";

const CommentTile: React.FC<QuestionProps> = ({
  upvotes,
  comments,
  question,
  person,
  //   viewStyle,
  //   status,
}) => {
  // console.log("status", status);
  return (
    <div className="w-full flex p-2">
      {person ? (
        <div className="flex-none pr-2">
          <img
            src={person}
            className="rounded-full w-10 h-10 shadow-lg object-cover"
          />
        </div>
      ) : null}
      <div>
        <div
          className={clsx(
            "shadow-lg ",
            // "w-2/3",
            "p-2",
            "bg-blue-500 rounded-md",
            "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
          )}
        >
          <div className="flex items-center">
            {/* <p className={clsx("text-gray-700")}>Q</p> */}
            <p className="text-gray-50 text-sm pl-1">{question}</p>
          </div>
        </div>
        <div className="p-2 pt-2 flex items-center">
          <div>
            <CommentHeader numUpVotes={upvotes} numComments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentTile;
