import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import PatientProfileTemplate from "@templates/PatientProfileTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  patientId: string | null;
}
const PatientProfile: React.FC<Props> = ({ patientId }) => {
  // console.log("patientId", patientId);
  const { authStatus, user, signOut } = useAuth();
  // console.log("Auth status", authStatus);
  // console.log("user", user);
  // console.log("signOut", signOut);

  return (
    <DefaultLayout
      title={seoData.patientProfile.title}
      description={seoData.patientProfile.description}
      img={seoData.patientProfile.img}
      link={`https://socialboat.live/admin/patients/${patientId}`}
      canonical={`https://socialboat.live/admin/patients/${patientId}`}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <div />
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        user &&
        (user.isDoctor || user.role === "admin") &&
        patientId ? (
        <PatientProfileTemplate
          patientId={patientId}
          onSignOut={signOut}
          isAdmin={user.role === "admin"}
        />
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

export default PatientProfile;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";

  if (uid && typeof uid === "string") {
    return {
      revalidate: 1,
      props: {
        patientId: uid,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      patientId: null,
    },
  };
};
