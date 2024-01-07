import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import EditNotificatioTemplate from "@templates/NotificationTemplate/EditNotificatioTemplate";

interface Props {
  templateId: string;
}

const ComposeSpecificNotificationPage: React.FC<Props> = ({ templateId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/notifications/compose/${templateId}`}
      canonical={`https://${homeDomain}/admin/notifications/compose/${templateId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Notification Dashboard for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <EditNotificatioTemplate templateId={templateId} />
      ) : (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default ComposeSpecificNotificationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { templateId: "home" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const templateId = params ? params.templateId : "";

  return {
    props: {
      templateId,
    },
  };
};
