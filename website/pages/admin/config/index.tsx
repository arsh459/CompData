import React from "react";

//local
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import ConfigPage from "@templates/AdminDashboard/ConfigPage/ConfigPage";

interface Props {
  //   uid: string;
}

const ConfigPageMain: React.FC<Props> = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/config`}
      canonical={`https://${homeDomain}/admin/config`}
      img={boatsSEO.img}
      noIndex={true}
      description="Config page for SocialBoat App"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <ConfigPage />
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

export default ConfigPageMain;
