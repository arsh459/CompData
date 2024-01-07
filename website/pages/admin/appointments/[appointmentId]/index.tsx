import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import ConsultationTemplate from "@templates/ConsultationTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  appointmentId: string;
}
const Consultation: React.FC<Props> = ({ appointmentId }) => {
  const { authStatus, user } = useAuth();

  return (
    <DefaultLayout
      title={seoData.consultationPage.title}
      description={seoData.consultationPage.description}
      img={seoData.consultationPage.img}
      link={seoData.consultationPage.link}
      canonical={seoData.consultationPage.link}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        user &&
        (user?.isDoctor || user.role === "admin") ? (
        <ConsultationTemplate
          doctor={user}
          appointmentId={appointmentId}
          canEdit={true}
        />
      ) : authStatus === "SUCCESS" && user ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Unauthorized access
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Consultation;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { appointmentId: "appointmentId" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const appointmentId = params ? params.appointmentId : "";

  return {
    revalidate: 1,
    props: {
      appointmentId:
        appointmentId && typeof appointmentId === "string" ? appointmentId : "",
    },
  };
};
