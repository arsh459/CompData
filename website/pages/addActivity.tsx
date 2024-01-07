import { activitySEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import AddActivityTemplate from "@templates/ActivityTemplate";

interface Props {}

const AddActivity: React.FC<Props> = ({}) => {
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  return (
    <DefaultLayout
      title={activitySEO.title}
      link={activitySEO.link}
      canonical={activitySEO.link}
      img={activitySEO.img}
      noIndex={activitySEO.noIndex}
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
          <AddActivityTemplate user={user} />
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
