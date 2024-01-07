import MediaCard from "@components/MediaCard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import ExerciseIcon from "@templates/InfluencerTemplate/components/icons/ExerciseIcon";
import PeopleIcon from "@templates/InfluencerTemplate/components/icons/PeopleIcon";
import { ProgramInterface } from "../OurPrograms";

interface Props {
  media?: AWSMedia | CloudinaryMedia;
  each: ProgramInterface;
}
const ProgramCardUpper: React.FC<Props> = ({ media, each }) => {
  return (
    <div className="w-full h-[30%] flex px-3">
      <div className="w-[40%] ">
        {media ? (
          <MediaCard
            media={media}
            HWClassStr="h-4/5"
            objectString="object-contain"
          />
        ) : (
          <div className="w-full h-full  flex justify-center items-center">
            <img
              src={each.img}
              alt="Women Yoga image"
              className="w-full object-contain"
            />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-around">
        <div className="">
          <p className="font-pJSB text-xl text-[#EEE9FF]">
            {each.programTitle}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-start mb-2">
            <div className="h-3 aspect-[11/12]  mr-1.5 ">
              <ExerciseIcon />
            </div>
            <div
              className="text-[#fff] text-xs"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {each.instructorDetails.description}
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="h-3 aspect-[14/11]  mr-1.5 ">
              <PeopleIcon />
            </div>
            <div
              className="text-[#fff] text-xs"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {each.instructorDetails.successStories}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCardUpper;
