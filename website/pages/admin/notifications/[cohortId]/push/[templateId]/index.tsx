import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
// import PushDashboard from "@modules/NotificationDashboard/PushDashboard";
import OnDemandProgressDashboard from "@modules/NotificationDashboard/OnDemandProgressDashboard";

interface Props {
  cohortId: string;
  templateId: string;
}

const CohortNotificationPushStatusPage: React.FC<Props> = ({
  cohortId,
  templateId,
}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/notifications/${cohortId}/push/${templateId}`}
      canonical={`https://${homeDomain}/admin/notifications/${cohortId}/push/${templateId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Notification Progress for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <OnDemandProgressDashboard
          cohortId={cohortId}
          templateId={templateId}
        />
      ) : (
        //
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

export default CohortNotificationPushStatusPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cohortId: "home", templateId: "temp" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cohortId = params ? params.cohortId : "";
  const templateId = params ? params.templateId : "";

  return {
    props: {
      cohortId,
      templateId,
    },
  };
};
