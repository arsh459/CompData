import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddNutritionTargetTemplate from "@templates/RewardsTemplate/AddNutritionTargetTemplate";

interface Props {
  nutriTargetId: string;
  uid: string;
}

const AddNutritionTargetPage: React.FC<Props> = ({ nutriTargetId, uid }) => {
  const { user, authStatus } = useAuth();
  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/patients/${uid}/config/${nutriTargetId}`}
      canonical={`https://${homeDomain}/admin/patients/${uid}/config/${nutriTargetId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && nutriTargetId && uid ? (
        <AddNutritionTargetTemplate uid={uid} nutriTargetId={nutriTargetId} />
      ) : (
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

export default AddNutritionTargetPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
          nutriTargetId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  const nutriId = params ? params.nutriTargetId : "";

  if (
    uid &&
    typeof uid === "string" &&
    nutriId &&
    typeof nutriId === "string"
  ) {
    return {
      revalidate: 1,
      props: {
        nutriTargetId: nutriId,
        uid,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      nutriTargetId: null,
      uid: null,
    },
  };
};
