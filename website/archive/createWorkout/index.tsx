import { workoutSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import WorkoutEditorHolder from "@templates/WorkoutEditor/WorkoutEditorHolder";

interface Props {}
const CreateWorkout: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={workoutSEO.title}
      description={workoutSEO.description}
      noIndex={workoutSEO.noIndex}
      link={workoutSEO.link}
      canonical={workoutSEO.link}
      img={workoutSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <WorkoutEditorHolder />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateWorkout;
