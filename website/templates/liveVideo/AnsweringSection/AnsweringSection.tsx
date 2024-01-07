import CommentHeader from "@templates/liveVideo/AnsweringSection/CommentHeader";

interface Props {
  heading: string;
  currentQuestion: string;
  commentHidden?: boolean;
  headerText: string;
}

const AnsweringSection: React.FC<Props> = ({
  currentQuestion,
  commentHidden,
  headerText,
}) => {
  return (
    <div>
      {/* <p className="text-gray-700 text-sm font-semibold">{heading}</p> */}
      <div className="flex">
        {/* <div className="bg-orange-500 p-1 rounded-lg shadow-md"> */}
        <p className="text-orange-500 text-xs">{headerText}</p>
        {/* </div> */}
      </div>
      <p className="text-gray-600 text-sm italic font-semibold">
        {currentQuestion}
      </p>

      {commentHidden ? null : (
        <div className="pt-0.5">
          <CommentHeader showSave={true} numComments={12} numUpVotes={4} />
        </div>
      )}
    </div>
  );
};

export default AnsweringSection;
