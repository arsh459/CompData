import React from "react";

//local
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import GptResponseTemplate from "@templates/GptResponseTemplate/GptResponseTemplate";

interface Props {
  //   uid: string;
}

const PromptsPageMain: React.FC<Props> = ({}) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus); ADD BUTTON - add

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/gptresponses`}
      canonical={`https://${homeDomain}/admin/gptresponses`}
      img={boatsSEO.img}
      noIndex={true}
      description="Gpt Response archive page for SocialBoat App"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <>
          <GptResponseTemplate />
        </>
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

export default PromptsPageMain;
