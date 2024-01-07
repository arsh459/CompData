import { onboardSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import ProfileEditorV2 from "@templates/editEvent/ProfileEditor/ProfileEditorV2";

interface Props {}
const Onboard: React.FC<Props> = ({}) => {
  return (
    <DefaultLayout
      title={onboardSEO.title}
      description={onboardSEO.description}
      noIndex={onboardSEO.noIndex}
      link={onboardSEO.link}
      canonical={onboardSEO.link}
      img={onboardSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-screen-xl mx-auto h-screen">
          <ProfileEditorV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Onboard;
