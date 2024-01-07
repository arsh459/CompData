import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import PushDashboard from "@modules/NotificationDashboard/PushDashboard";

interface Props {
  cohortId: string;
}

const CohortNotificationPushPage: React.FC<Props> = ({ cohortId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/notifications/${cohortId}/push`}
      canonical={`https://${homeDomain}/admin/notifications/${cohortId}/push`}
      img={boatsSEO.img}
      noIndex={true}
      description="Notification Dashboard for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <PushDashboard id={cohortId} />
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

export default CohortNotificationPushPage;

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
