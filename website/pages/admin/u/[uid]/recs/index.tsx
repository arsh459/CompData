import React, { useState } from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import RecommendationsDashboard from "@templates/Recommendations";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
// import DownloadTemplate from "@templates/download/DownloadTemplate";

interface Props {
  uid: string;
}

const RecommendationPage: React.FC<Props> = ({ uid }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();

  const router = useRouter();
  const q = router.query as { type?: "workout" | "nutrition" };

  const [type, setType] = useState<"workout" | "nutrition">(
    q.type ? q.type : "workout"
  );
  const toggleType = (newType: "workout" | "nutrition") => {
    setType(newType);
  };

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/u/${uid}/recs`}
      canonical={`https://${homeDomain}/admin/u/${uid}/recs`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && uid ? (
        <div>
          <RecommendationsDashboard
            uid={uid}
            type={type}
            toggleType={toggleType}
          />
        </div>
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

export default RecommendationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  //   console.log("host", uid);

  return {
    revalidate: 1,
    props: {
      uid: uid,
    },
  };
};
