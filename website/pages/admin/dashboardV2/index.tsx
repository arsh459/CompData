import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AdminDashboardV2 from "@templates/AdminDashboard/AdminDashboardV2";

interface Props {
  //   uid: string;
}

const DownloadUserPage: React.FC<Props> = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/dashboardV2`}
      canonical={`https://${homeDomain}/admin/dashboardV2`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <AdminDashboardV2 user={user} />
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
