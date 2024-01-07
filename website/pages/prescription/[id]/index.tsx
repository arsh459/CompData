import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import PrescriptionTemplate from "@templates/PrescriptionTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  appointmentId: string | null;
}
const PrescriptionPage: React.FC<Props> = ({ appointmentId }) => {
  const { authStatus, user, signOut } = useAuth();

  return (
    <DefaultLayout
      title="Your Prescription"
      description="This is a confidential document and only authorised users can see this information"
      img={seoData.patientProfile.img}
      link={`https://socialboat.live/prescription/${appointmentId}`}
      canonical={`https://socialboat.live/prescription/${appointmentId}`}
      siteName="SocialBoat"
      noIndex={true}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        user &&
        // (user.isDoctor || user.role === "admin") &&
        appointmentId ? (
        <PrescriptionTemplate
          appointmentId={appointmentId}
          onSignOut={signOut}
          signedInUID={user.uid}
          isAdmin={user.role === "admin" || user.isDoctor}
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

export default PrescriptionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params ? params.id : "";

  if (id && typeof id === "string") {
    return {
      revalidate: 1,
      props: {
        appointmentId: id,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      appointmentId: null,
    },
  };
};
