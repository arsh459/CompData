import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ProgramInterface } from "./OurPrograms";
import ProgramCardBottom from "./programCard/ProgramCardBottom";
import ProgramCardMiddle from "./programCard/ProgramCardMiddle";
import ProgramCardUpper from "./programCard/ProgramCardUpper";

interface Props {
  media?: AWSMedia | CloudinaryMedia;
  each: ProgramInterface;
  coachUID: string;
}

const ProgramCard: React.FC<Props> = ({ each, media, coachUID }) => {
  return (
    <div
      className="relative w-full border-[3px] border-white/20 rounded-[35px] max-w-screen-iphoneX overflow-hidden flex flex-col justify-around xs:h-[60vh] sm:h-[60vh] mx-auto"
      style={{
        minHeight: "541px",
      }}
    >
      <div
        className="absolute top-0 bottom-0 right-0 left-0 -z-10"
        style={{
          background: each.backgroundGradient,
        }}
      ></div>
      <ProgramCardUpper media={media} each={each} />
      <ProgramCardMiddle details={each.programDetails} />
      <ProgramCardBottom each={each} coachUID={coachUID} />
    </div>
  );
};

export default ProgramCard;
