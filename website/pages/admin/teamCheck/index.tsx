import React from "react";

//local

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import UserSearch from "@modules/Bookings/UserSearch";

// import DownloadTemplate from "@templates/download/DownloadTemplate";

const TeamCheck: React.FC = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/teamCheck`}
      canonical={`https://${homeDomain}/admin/teamCheck`}
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
          <UserSearch baseRoute={`/admin/teamCheck`} />
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

export default TeamCheck;
