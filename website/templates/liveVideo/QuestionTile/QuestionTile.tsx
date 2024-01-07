import clsx from "clsx";
import CommentHeader from "../AnsweringSection/CommentHeader";

export interface QuestionProps {
  question: string;
  upvotes: number;
  comments: number;
  viewStyle: "comment" | "question";
  status: "answered" | "unanswered" | "duplicate";
  person?: string;
}

const QuestionTile: React.FC<QuestionProps> = ({
  upvotes,
  comments,
  question,
  viewStyle,
  status,
}) => {
  // console.log("status", status);
  return (
    <div
      className={clsx(
        "shadow-sm p-2",
        "hover:-translate-y-0.5 transition-transform transform hover:shadow-2xl"
      )}
    >
      <div className="flex items-center">
        <p className={clsx("text-gray-700")}>Q</p>
        <p className="text-gray-600 text-sm pl-1">{question}</p>
      </div>

      <div className="pb-2 flex items-center">
        <div
          className={clsx(
            "capitalize",
            "shadow-md",
            "p-1 pl-2 pr-2  rounded-lg",
            status === "answered"
              ? "bg-green-500"
              : status === "unanswered"
              ? "bg-orange-500"
              : status === "duplicate"
              ? "bg-indigo-500"
              : ""
          )}
        >
          <p className="text-white text-xs">{status}</p>
        </div>
      </div>
      <div>
        <CommentHeader numUpVotes={upvotes} numComments={comments} />
      </div>
    </div>
  );
};

export default QuestionTile;
