import { activitySEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import AddSubTaskTemplate from "@templates/SubTaskTemplate/AddSubTaskTemplate";

interface Props {}

const AddActivity: React.FC<Props> = ({}) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  // console.log("p", process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <DefaultLayout
      title={"SocialBoat Admin: Add task"}
      link={`https://socialboat.live/admin/subTasks/add`}
      canonical={`https://socialboat.live/admin/subTasks/add`}
      img={activitySEO.img}
      noIndex={true}
      description={"Form to add subtasks"}
    >
      {authStatus === "PENDING" ? (
        <></>
      ) : authStatus === "SUCCESS" && user ? (
        <div className="max-w-lg mx-auto">
          <AddSubTaskTemplate user={user} />
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
