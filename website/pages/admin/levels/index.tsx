import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import LevelsDashboard from "@templates/AdminDashboard/LevelsDashboard/AllLevels";

interface Props {}

const SlotPage: React.FC<Props> = ({}) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/levels`}
      canonical={`https://${homeDomain}/admin/levels`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat levels"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <LevelsDashboard />
      ) : (
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
