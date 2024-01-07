import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  planId: string;
}

const AppSubPage: React.FC<Props> = ({ planId }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/appsubscribers/planId`}
      canonical={`https://${homeDomain}/admin/appsubscribers/planId`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for App Subscription"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <AppSubDashboard uid= />
        <div>planId:{planId}</div>
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

export default AppSubPage;
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          planId: "0cPvVrnphNJBnvvOM9Zf",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("params", params);
  return {
    revalidate: 1,
    props: {
      planId: params ? params.planId : "",
    },
  };
};
