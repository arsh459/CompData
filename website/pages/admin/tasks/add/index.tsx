import { activitySEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import AddWorkoutTemplate from "@templates/ActivityTemplate/AddWorkoutTemplate";

interface Props {}

const AddActivity: React.FC<Props> = ({}) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  return (
    <DefaultLayout
      title={"SocialBoat Admin: Add task"}
      link={`https://socialboat/live/admin/tasks/add`}
      canonical={`https://socialboat/live/admin/tasks/add`}
      img={activitySEO.img}
      noIndex={true}
      description={activitySEO.description}
    >
      {/* <Script
        type="text/javascript"
        // strategy="lazyOnload"
        strategy="beforeInteractive"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      {authStatus === "PENDING" ? (
        <></>
      ) : authStatus === "SUCCESS" && user ? (
        <div className="max-w-lg mx-auto">
          <AddWorkoutTemplate user={user} />
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      )}

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </DefaultLayout>
  );
};

export default AddActivity;
