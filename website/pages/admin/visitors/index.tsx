import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminGamesTemplate from "@templates/AdminGames/AdminGamesTemplate";
import VisitorsTemplate from "@modules/Visitors/VisitorsTemplate";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";

const VisitorsPage = () => {
  const { user, authStatus, hideRecapcha } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/visitors`}
      canonical={`https://${homeDomain}/admin/visitors`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <VisitorsTemplate user={user} />
      ) : !user?.uid ? (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : "Something went wrong"}
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

export default VisitorsPage;
