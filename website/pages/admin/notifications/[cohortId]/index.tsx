import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import NotificationDashboard from "@modules/NotificationDashboard/NotificationDashboard";
import { GetStaticPaths, GetStaticProps } from "next";
import NotificationCohortDashboard from "@modules/NotificationDashboard/NotificationCohortDashboard";

interface Props {
  cohortId: string;
}

const CohortNotificationPage: React.FC<Props> = ({ cohortId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/notifications/${cohortId}`}
      canonical={`https://${homeDomain}/admin/notifications/${cohortId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Notification Dashboard for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <NotificationCohortDashboard id={cohortId} />
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

export default CohortNotificationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { cohortId: "home" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cohortId = params ? params.cohortId : "";

  return {
    props: {
      cohortId,
    },
  };
};
