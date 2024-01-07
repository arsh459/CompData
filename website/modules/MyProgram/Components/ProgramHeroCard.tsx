import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import ProgramHeroLeftElement from "./ProgramHeroLeftElement";
import ProgramHeroRightElement from "./ProgramHeroRightElement";
interface Props {
  img?: CloudinaryMedia | AWSMedia;
  courseDecorImage?: CloudinaryMedia | AWSMedia;
  badgeId?: string;
  workoutStarted?: boolean;
}
const ProgramHeroCard: React.FC<Props> = ({
  img,
  courseDecorImage,
  badgeId,
  workoutStarted,
}) => {
  return (
    <div className="w-full h-2/3 flex flex-col md:flex-row justify-between">
      <ProgramHeroLeftElement
        img={img}
        courseDecorImage={courseDecorImage}
        badgeId={badgeId}
        navPath={
          workoutStarted ? `/myProgram/${badgeId}` : `/coursePage/${badgeId}`
        }
      />
      <div className="w-8 aspect-1" />
      <ProgramHeroRightElement />
    </div>
  );
};

export default ProgramHeroCard;
