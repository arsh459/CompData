// import ChatHolder from "@templates/inbox/ChatHolder/ChatHolder"

// import AnsweringSection from "@templates/liveVideo/AnsweringSection/AnsweringSection";
import LiveVideoHeader from "@templates/liveVideo/LiveVideoHeader/LiveVideoHeader";
import RecordingFooter from "./RecordingFooter/RecordingFooter";

interface Props {
  mainURL: string;
  currentQuestion: string;
  persons: string[];
}

const LiveToRecorded: React.FC<Props> = ({ mainURL, persons }) => {
  return (
    <div className="rounded-xl relative">
      <div>
        <LiveVideoHeader mainURL={mainURL} height="large" persons={persons} />
      </div>

      {/* <div className="p-2 pt-1 shadow-md"> */}
      {/* <AnsweringSection
          heading={""}
          currentQuestion={currentQuestion}
          commentHidden={true}
        /> */}
      {/* </div> */}

      <div className="h-10" />

      <div className="sticky bottom-0 left-0 right-0">
        <RecordingFooter />
      </div>
    </div>
  );
};

export default LiveToRecorded;
