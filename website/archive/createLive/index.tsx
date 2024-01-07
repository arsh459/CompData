import { liveSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LiveEditorHolder from "@templates/WorkoutEditor/LiveEditorHolder";
// import NutritionEditorHolder from "@templates/WorkoutEditor/NutritionEditorHolder";
// import WorkoutEditorHolder from "@templates/WorkoutEditor/WorkoutEditorHolder";

interface Props {}
const CreateLive: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={liveSEO.title}
      description={liveSEO.description}
      noIndex={liveSEO.noIndex}
      link={liveSEO.link}
      canonical={liveSEO.link}
      img={liveSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <LiveEditorHolder />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateLive;
