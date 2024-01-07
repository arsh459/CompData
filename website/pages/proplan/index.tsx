import Loading from "@components/loading/Loading";
import { useAuth } from "@hooks/auth/useAuth";
import BonusAccess from "@modules/ProPlanModule/BonusAccess";
import FaqProList from "@modules/ProPlanModule/FaqProList";
import FetauresWillGet from "@modules/ProPlanModule/FeaturesWillGet";
import GoldenShieldCard from "@modules/ProPlanModule/GoldenShieldCard";
import MyProgramHeader from "@templates/MyProgramTemplate/Components/MyProgramHeader";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { Background } from "@templates/WomenTemplate/components/Background";

const ProplanPage = () => {
  const { authStatus, signOut, user } = useAuth();

  return (
    <>
      {authStatus === "PENDING" ? (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : authStatus === "SUCCESS" && user ? (
        <div className="bg-[#232136] text-white w-screen min-h-[70vh] scrollbar-hide overflow-hidden relative z-0">
          <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/sakhi_website__3__P8OJVTO9VR.png?updatedAt=1684999744240" />
          <MyProgramHeader userObj={user} onSignOut={signOut} />
          <div className="max-w-[800px] mx-auto p-4">
            <GoldenShieldCard />
            <div className="bg-[#00000066] rounded-[35px] border-2 border-[#FFFFFF47] mt-10 px-8 md:px-12 py-4 md:py-8">
              <FetauresWillGet user={user} />
              <BonusAccess />
              <FaqProList />

              <a
                href="https://socialboat.app.link/download"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-full bg-[#FFFFFFCC] rounded-full shadow">
                  <p className="font-popM text-lg py-4 text-[#000000B2] text-center">
                    Download the app
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      )}
    </>
  );
};

export default ProplanPage;
