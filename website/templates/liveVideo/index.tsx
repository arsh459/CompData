// import ChatHolder from "@templates/inbox/ChatHolder/ChatHolder";
import AnsweringSection from "./AnsweringSection/AnsweringSection";
import LiveVideoHeader from "./LiveVideoHeader/LiveVideoHeader";
import QuestionHolder from "./QuestionHolder/QuestionHolder";
import { QuestionProps } from "./QuestionTile/QuestionTile";
import VideoFooter from "./VideoFooter/VideoFooter";

interface Props {
  mainURL: string;
  heading: string;
  currentQuestion: string;
  questions: QuestionProps[];
  persons: string[];
}

const LiveTemplate: React.FC<Props> = ({
  mainURL,
  heading,
  currentQuestion,
  questions,
  persons,
}) => {
  return (
    <div className="rounded-xl relative">
      <div>
        <LiveVideoHeader mainURL={mainURL} height="full" persons={persons} />
      </div>

      <div className="p-2 pt-1 shadow-md">
        <AnsweringSection
          heading={heading}
          headerText="Playing now:"
          currentQuestion={currentQuestion}
        />
      </div>

      <div>
        <QuestionHolder questions={questions} />
      </div>

      {/* <div className="h-32" /> */}

      <div className="sticky bottom-0 left-0 right-0">
        <VideoFooter />
      </div>
    </div>
  );
};

export default LiveTemplate;
