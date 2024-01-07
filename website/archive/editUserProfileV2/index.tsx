import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import EditProfileTemplateV2 from "@templates/EditProfileV2Template/EditProfileTemplateV2";
// import Script from "next/script";

interface Props {}

const EditUserProfileV2: React.FC<Props> = ({}) => {
  const { user, hideRecapcha, authStatus, signOut } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");
  const { title, desc, img, site_name, favIcon } = useUserSEOData(user);
  return (
    <DefaultLayout
      favIcon={favIcon}
      siteName={site_name}
      title={title}
      description={desc}
      link={`https://socialboat.live/editUserProfileV2`}
      canonical={`https://socialboat.live/editUserProfileV2`}
      noIndex={true}
      img={img}
    >
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      {authStatus === "PENDING" ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div>
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : authStatus === "SUCCESS" && user ? (
        <div className="max-w-lg mx-auto">
          <EditProfileTemplateV2
            user={user}
            onSignOut={signOut}
            onSignIn={() => {}}
          />
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

export default EditUserProfileV2;
