import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddSprintDetailTemplate from "@templates/RewardsTemplate/AddSprintDetailTemplate";
// import TaskTemplate from "@templates/TaskTemplate/TaskTemplate";
// import RewardsTemplate from "@templates/RewardsTemplate/RewardsTemplate";

interface Props {
  gameId: string;
  sprintDetailId: string;
}

const AddSprintPage: React.FC<Props> = ({ gameId, sprintDetailId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/games/${gameId}/sprintdetails/${sprintDetailId}`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/sprintdetails/${sprintDetailId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="SprintDetails Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && gameId ? (
        <AddSprintDetailTemplate
          uid={user.uid}
          gameId={gameId}
          sprintDetailId={sprintDetailId}
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

export default AddSprintPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
          sprintDetailId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      gameId: params ? params.gameId : "",
      sprintDetailId: params ? params.sprintDetailId : "",
    },
  };
};
