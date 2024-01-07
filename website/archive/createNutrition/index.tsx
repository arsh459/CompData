import { nutritionSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import NutritionEditorHolder from "@templates/WorkoutEditor/NutritionEditorHolder";
// import WorkoutEditorHolder from "@templates/WorkoutEditor/WorkoutEditorHolder";

interface Props {}
const CreateNutrition: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={nutritionSEO.title}
      description={nutritionSEO.description}
      noIndex={nutritionSEO.noIndex}
      link={nutritionSEO.link}
      canonical={nutritionSEO.link}
      img={nutritionSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <NutritionEditorHolder />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateNutrition;
