import { seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import JoinChallengeEdit from "@templates/editEvent/JoinChallengeEditor/JoinChallengeEdit";
// import ProfileEditorV2 from "@templates/editEvent/ProfileEditor/ProfileEditorV2";

interface Props {}
const Onboard: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={seoData.joinPage.title}
      description={seoData.joinPage.description}
      noIndex={false}
      link={seoData.joinPage.link}
      canonical={seoData.joinPage.link}
      img={seoData.joinPage.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <JoinChallengeEdit />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Onboard;
