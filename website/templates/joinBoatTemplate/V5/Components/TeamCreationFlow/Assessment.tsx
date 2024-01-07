import { weEventTrack } from "@analytics/webengage/user/userLog";
import { sectionTypes } from "@hooks/joinBoat/V5/useSection";

interface Props {
  gotoSection: (val: sectionTypes) => void;
}

const Assessment: React.FC<Props> = ({ gotoSection }) => {
  const onFScanClick = () => {
    gotoSection("welcome");
    weEventTrack("orgFCanRequest_clickNext", {});
  };

  const onSkip = () => {
    gotoSection("plans");
    weEventTrack("orgFCanRequest_clickSkip", {});
  };

  return (
    <div className="px-4 w-full max-w-md mx-auto">
      <p className="text-2xl font-baib text-center">
        Let&apos;s do a free health assessment check !
      </p>
      <div className="w-1/2 flex flex-col mx-auto py-8">
        <button
          className="bg-white text-black p-2 rounded-lg font-baim w-full"
          onClick={onFScanClick}
        >
          Let&apos;s Do it!
        </button>
        <div className="h-8" />
        <button
          className="border border-white text-white p-2 rounded-lg font-baim w-full"
          onClick={onSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Assessment;
