import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddStoriesTemplate from "@templates/StoriesTemplate";
// import TaskTemplate from "@templates/TaskTemplate/TaskTemplate";
// import RewardsTemplate from "@templates/RewardsTemplate/RewardsTemplate";

interface Props {
  storiesId: string;
}

const AddStoryPage: React.FC<Props> = ({ storiesId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/stories/${storiesId}`}
      canonical={`https://${homeDomain}/admin/stories/${storiesId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && storiesId ? (
        <AddStoriesTemplate uid={user.uid} storiesId={storiesId} />
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

export default AddStoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          storiesId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      storiesId: params ? params.storiesId : "",
    },
  };
};
