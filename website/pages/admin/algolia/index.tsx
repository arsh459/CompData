import Loading from "@components/loading/Loading";
import { boatsSEO } from "@constants/seo";
import { homeDomain } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
// import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AlgoliaTemplate from "@templates/AlgoliaTemplate/AlgoliaTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const AlgoliaPage: React.FC<Props> = ({}) => {
  const { authStatus, signOut, user } = useAuth();

  return (
    <DefaultLayout
      title={`User Algolia page`}
      link={`https://${homeDomain}/algolia`}
      canonical={`https://${homeDomain}/algolia`}
      img={boatsSEO.img}
      noIndex={true}
      description="User Timeline Example"
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && user && user.role === "admin" ? (
        <AlgoliaTemplate user={user} onSignOut={signOut} />
      ) : authStatus === "SUCCESS" && user ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Unauthorized access
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-white flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default AlgoliaPage;
