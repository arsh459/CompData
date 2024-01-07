import CommentTile from "../CommentTile/CommentTile";
import QuestionTile, { QuestionProps } from "../QuestionTile/QuestionTile";

interface Props {
  questions: QuestionProps[];
}

const QuestionHolder: React.FC<Props> = ({ questions }) => {
  return (
    <div>
      {questions.map((item, index) => {
        if (item.viewStyle === "question") {
          return (
            <div key={`question-${index}`} className="">
              <QuestionTile {...item} />
            </div>
          );
        } else {
          return (
            <div key={`question-${index}`} className="">
              <CommentTile {...item} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default QuestionHolder;
