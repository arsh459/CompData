import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminDashboard from "@templates/AdminDashboard/AdminDashboard";
// import ActivityReview from "@templates/AdminDashboard/ActivityReview/ActivityReview";
// import { useUserActivities } from "@hooks/activities/useUserActivities";
import ListUserActivity from "@templates/AdminDashboard/ListUserActivity";
// import { GetStaticPaths, GetStaticProps } from "next";
// import DownloadUserPageTemplate from "@templates/download/DownloadUserPage";
// import DownloadTemplate from "@templates/download/DownloadTemplate";

interface Props {
  activityId: string;
  uid: string;
}

// const now_2 = Date.now() - 24 * 2 * 60 * 60 * 1000;

const DownloadUserPage: React.FC<Props> = ({ uid }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  //   console.log("user", user, activityId);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/dashboardV2/`}
      canonical={`https://${homeDomain}/admin/dashboardV2`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <ListUserActivity uid={uid} />
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access "
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default DownloadUserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   console.log("params", params);
  return {
    revalidate: 1,
    props: {
      uid: params ? params.uid : "",
    },
  };
};
