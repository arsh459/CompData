import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import SlotDashboard from "@templates/AdminDashboard/SlotDashboard";

interface Props {
  //   uid: string;
}

const SlotPage: React.FC<Props> = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/slots`}
      canonical={`https://${homeDomain}/admin/slots`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <SlotDashboard />
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

export default SlotPage;
