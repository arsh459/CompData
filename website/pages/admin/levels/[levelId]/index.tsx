import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import AddLevel from "@templates/AdminDashboard/LevelsDashboard/AddLevel";

interface Props {
  levelId: string;
}

const SlotDayPage: React.FC<Props> = ({ levelId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/levels/${levelId}`}
      canonical={`https://${homeDomain}/admin/levels/${levelId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <AddLevel user={user} levelId={levelId} />
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

export default SlotDayPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { levelId: "base" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const levelId = params ? params.levelId : "";

  if (levelId) {
    return {
      props: {
        levelId: levelId,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/levels",
      permanent: false,
    },
  };
};
