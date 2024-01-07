import React from "react";

//local
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import PromptTemplate from "@models/Prompts/PromptTemplate";

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
      link={`https://${homeDomain}/admin/prompts`}
      canonical={`https://${homeDomain}/admin/prompts`}
      img={boatsSEO.img}
      noIndex={true}
      description="Prompts page for SocialBoat App"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <PromptTemplate />
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
