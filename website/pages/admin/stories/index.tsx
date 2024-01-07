import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminDashboard from "@templates/AdminDashboard/AdminDashboard";
import StoriesListTemplate from "@templates/RewardsTemplate/StoriesListTemplate";

interface Props {
  //   uid: string;
}

const StoriesDashboard: React.FC<Props> = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  //   console.log("user", user, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/stories`}
      canonical={`https://${homeDomain}/admin/stories`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold  h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <StoriesListTemplate />
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

export default StoriesDashboard;
