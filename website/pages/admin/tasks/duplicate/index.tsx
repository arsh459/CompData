import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import DuplicateTaskDashboard from "@modules/Duplicate/DuplicateTaskDashboard";

interface Props {}

const DuplicateSectionPage: React.FC<Props> = ({}) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin: Duplicate page"
      link={`https://${homeDomain}/admin/tasks/duplicate`}
      canonical={`https://${homeDomain}/admin/tasks/duplicate`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat: Duplicate Task"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <AddBadgeSection prizeId={prizeId} gameId={gameId} />
        <div>
          <DuplicateTaskDashboard />
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

export default DuplicateSectionPage;
