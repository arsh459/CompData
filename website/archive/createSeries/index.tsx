import { seriesSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
// import SeriesEditor from "@templates/SeriesEditor/SeriesEditor";
import SeriesSelector from "@templates/SeriesEditor/SeriesSelector";
// import JoinChallengeEdit from "@templates/editEvent/JoinChallengeEditor/JoinChallengeEdit";
// import ProfileEditorV2 from "@templates/editEvent/ProfileEditor/ProfileEditorV2";

interface Props {}
const CreateSeries: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={seriesSEO.title}
      description={seriesSEO.description}
      noIndex={seriesSEO.noIndex}
      link={seriesSEO.link}
      canonical={seriesSEO.link}
      img={seriesSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <SeriesSelector />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateSeries;
