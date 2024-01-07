import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import DownloadUserPageTemplate from "@templates/download/DownloadUserPage";
// import DownloadTemplate from "@templates/download/DownloadTemplate";

interface Props {
  uid: string;
  date: string;
}

const DownloadUserPage: React.FC<Props> = ({ uid, date }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  //   console.log("user", user, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/download/${uid}/dates/${date}`}
      canonical={`https://${homeDomain}/admin/download/${uid}/dates/${date}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <div>
          <DownloadUserPageTemplate uid={uid} date={date} />
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

export default DownloadUserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13", date: "2022-04-08" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    revalidate: 1,
    props: {
      uid: params ? params.uid : "",
      date: params ? params.date : "",
    },
  };
};