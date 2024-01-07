import { weEventTrack } from "@analytics/webengage/user/userLog";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";

interface Props {
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
}

const SkipNow: React.FC<Props> = ({ gotoSection }) => {
  return (
    <button
      onClick={() => {
        weEventTrack("fScanConsultationSlot_clickSkipForNow", {});
        gotoSection("download");
      }}
      className="absolute top-3 right-3 z-10 flex items-center rounded-full bg-white backdrop-blur-3xl px-4 py-1"
    >
      <p className="text-[#1C1C1C] text-sm font-medium">Skip for now</p>
      <img
        src="https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237"
        className="w-3 aspect-1 ml-1"
        alt="right arrow"
      />
    </button>
  );
};

export default SkipNow;
