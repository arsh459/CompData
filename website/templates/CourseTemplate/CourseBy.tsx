import { UserInterface } from "@models/User/User";

interface Props {
  primaryCoach?: UserInterface;
}

const CourseBy: React.FC<Props> = ({ primaryCoach }) => {
  return primaryCoach ? (
    <div className="w-screen h-screen max-w-screen-lg mx-auto">
      <div className="w-full sm:w-1/2 pt-16 sm:pt-20 p-4">
        <h2 className="text-white/80 text-base sm:text-xl lg:text-2xl font-qsB">
          Course designed by
          <br />
          <span className="text-white text-3xl sm:text-4xl lg:text-5xl capitalize">
            {primaryCoach?.name}
          </span>
        </h2>
        <div className="w-6 aspect-1" />
        <p className="text-white/80 text-sm sm:text-base lg:text-lg font-popR">
          {primaryCoach?.bio}
        </p>
      </div>
    </div>
  ) : null;
};

export default CourseBy;
