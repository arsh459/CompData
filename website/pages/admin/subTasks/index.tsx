import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import SubTaskTemplate from "@templates/SubTaskTemplate";

interface Props {}

const TaskPage: React.FC<Props> = ({}) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/subTasks`}
      canonical={`https://${homeDomain}/admin/subTasks`}
      img={boatsSEO.img}
      noIndex={true}
      description="Sub Task Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <SubTaskTemplate />
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

export default TaskPage;
