import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import AdminGameConfiguration from "@templates/AdminGameConfigration";
// import TaskTemplate from "@templates/TaskTemplate/TaskTemplate";
// import RewardsTemplate from "@templates/RewardsTemplate/RewardsTemplate";
// import AddRewardsTemplate from "@templates/RewardsTemplate/AddRewardTemplate";

interface Props {
  gameId: string;
  rewardId: string;
}

const AddConfigurationPage: React.FC<Props> = ({ gameId, rewardId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/games/${gameId}/configuration`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/configuration`}
      img={boatsSEO.img}
      noIndex={true}
      description="Task Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && gameId ? (
        // <>{/** KULDEEP CODE HERE */}</>
        <AdminGameConfiguration gameId={gameId} />
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

export default AddConfigurationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: TEAM_ALPHABET_GAME,
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    revalidate: 1,
    props: {
      gameId: params ? params.gameId : "",
    },
  };
};
