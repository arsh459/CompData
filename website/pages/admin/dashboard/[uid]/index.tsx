import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticPaths, GetStaticProps } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminDashboard from "@templates/AdminDashboard/AdminDashboard";
// import ActivityReview from "@templates/AdminDashboard/ActivityReview/ActivityReview";
// import { useUserActivities } from "@hooks/activities/useUserActivities";
import { useUserPrevActivities } from "@hooks/activities/useUserPreviousActs";
import Link from "next/link";
// import { GetStaticPaths, GetStaticProps } from "next";
// import DownloadUserPageTemplate from "@templates/download/DownloadUserPage";
// import DownloadTemplate from "@templates/download/DownloadTemplate";

interface Props {
  activityId: string;
  uid: string;
}

const now_2 = Date.now() - 24 * 2 * 60 * 60 * 1000;

const DownloadUserPage: React.FC<Props> = ({ uid }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  //   console.log("user", user, activityId);
  const { activities } = useUserPrevActivities(uid, now_2);

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
        <div className="flex flex-wrap">
          {activities.map((item) => {
            return (
              <div
                className="text-black border p-4 cursor-pointer"
                key={item.postId}
              >
                <Link
                  passHref
                  legacyBehavior
                  href={`/admin/dashboard/${item.authorUID}/${item.id}`}
                >
                  <a target="_blank">
                    <div>
                      <p>ActivityName {item.activityName}</p>
                      <p>UId: {item.authorUID}</p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
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
