import { onboardSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import EditEventTemplateV2 from "@templates/editEvent/EditEventTemplateV2";
// import ProfileEditorV2 from "@templates/editEvent/ProfileEditor/ProfileEditorV2";

interface Props {}
const EditEvent: React.FC<Props> = ({}) => {
  const { user } = useAuth();
  return (
    <DefaultLayout
      title={onboardSEO.title}
      description={onboardSEO.description}
      noIndex={onboardSEO.noIndex}
      link={onboardSEO.link}
      canonical={onboardSEO.link}
      img={onboardSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-50 to-gray-200">
        {user ? (
          <div className="max-w-screen-xl mx-auto h-screen">
            <EditEventTemplateV2 user={user} />
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default EditEvent;
