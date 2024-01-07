import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import TaskTemplate from "@templates/TaskTemplate/TaskTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  gameId: string;
}

const GameTasks: React.FC<Props> = ({ gameId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/tasks/games/${gameId}`}
      canonical={`https://${homeDomain}/admin/tasks/games/${gameId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Game Tasks"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <TaskTemplate gameId={gameId} />
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

export default GameTasks;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: "yourcoachabhi",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gameId = params ? params.gameId : "";

  return {
    revalidate: 1,
    props: {
      gameId: gameId,
    },
  };
};
