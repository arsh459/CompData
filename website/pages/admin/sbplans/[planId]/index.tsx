import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddSbPlanTemplate from "@templates/AddSbPlanTemplate";
// import TaskTemplate from "@templates/TaskTemplate/TaskTemplate";
// import RewardsTemplate from "@templates/RewardsTemplate/RewardsTemplate";

interface Props {
  planId: string;
}

const AddSbPlanPage: React.FC<Props> = ({ planId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/sbplans/${planId}`}
      canonical={`https://${homeDomain}/admin/sbplans/${planId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && planId ? (
        <AddSbPlanTemplate uid={user.uid} planId={planId} />
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

export default AddSbPlanPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          planId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      planId: params ? params.planId : "",
    },
  };
};
