import Loading from "@components/loading/Loading";
import { rectWomenImg, womenImg } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import DeleteAccountMain from "@modules/DeleteModule/component/DeleteAccountMain";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}

const DeleteAccountScreen: React.FC<Props> = ({}) => {
  const { authStatus } = useAuth();
  return (
    <DefaultLayout
      title="SocialBoat: Delete your account"
      description="With this you can delete all your data on SocialBoat. Please note this action is irreversible"
      link="https://socialboat.live/delete"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/delete"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate
          deviceType="android"
          setDeviceType={() => {}}
          /// org={query.org}
        />
      ) : authStatus === "SUCCESS" ? (
        <div className="">
          <DeleteAccountMain />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#232136] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default DeleteAccountScreen;
