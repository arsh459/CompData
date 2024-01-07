import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import AddAward from "@templates/AdminDashboard/AwardsDashboard/AddAward";

interface Props {
  awardId: string;
}

const SlotDayPage: React.FC<Props> = ({ awardId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/awards/${awardId}`}
      canonical={`https://${homeDomain}/admin/awards/${awardId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <AddAward user={user} awardId={awardId} />
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
    paths: [{ params: { awardId: "base" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const awardId = params ? params.awardId : "";

  if (awardId) {
    return {
      props: {
        awardId: awardId,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/awards",
      permanent: false,
    },
  };
};
