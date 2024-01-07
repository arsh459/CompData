// import LoadingModal from "@components/loading/LoadingModal";
import { dashboarSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { dashVisible } from "@templates/apply/Form/utils";
import EditEventTemplate from "@templates/editEvent/EditEventTemplate";
// import ProfileEditorV2 from "@templates/editEvent/ProfileEditor/ProfileEditorV2";
import clsx from "clsx";

interface Props {}
const Dashboard: React.FC<Props> = ({}) => {
  const { authStatus, loadComplete, user, hideRecapcha } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");
  // let authStatus = "PENDING";
  // let loadComplete = true;
  // console.log(user);
  // console.log("authStatus", authStatus, loadComplete);

  return (
    <DefaultLayout
      title={dashboarSEO.title}
      description={dashboarSEO.description}
      noIndex={dashboarSEO.noIndex}
      link={dashboarSEO.link}
      canonical={dashboarSEO.link}
      img={dashboarSEO.img}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div
          id="recaptcha-container"
          ref={element}
          className={hideRecapcha ? "hidden" : ""}
        />
        <div className="h-screen">
          {authStatus === "SUCCESS" && dashVisible(user) && user ? (
            <div className={clsx("w-screen h-screen bg-white")}>
              <EditEventTemplate user={user} />
            </div>
          ) : null}
          <div className={!dashVisible(user) && loadComplete ? "" : "hidden"}>
            <PhoneForm
              user={user}
              recaptcha={recaptcha}
              mobileInteractive={true}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
