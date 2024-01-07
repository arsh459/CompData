import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminDashboard from "@templates/AdminDashboard/AdminDashboard";
import ActivityReview from "@templates/AdminDashboard/ActivityReview/ActivityReview";
// import { GetStaticPaths, GetStaticProps } from "next";
// import DownloadUserPageTemplate from "@templates/download/DownloadUserPage";
// import DownloadTemplate from "@templates/download/DownloadTemplate";

interface Props {
  activityId: string;
  uid: string;
}

const DownloadUserPage: React.FC<Props> = ({ activityId, uid }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  //   console.log("user", user, activityId);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/dashboard/`}
      canonical={`https://${homeDomain}/admin/dashboard`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <ActivityReview user={user} activityId={activityId} uid={uid} />
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
          activityId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      activityId: params ? params.activityId : "",
      uid: params ? params.uid : "",
    },
  };
};
