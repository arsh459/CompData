import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import ScheduleSection from "@modules/ScheduleSection/ScheduleSection";

interface Props {
  gameId: string;
  prizeId: string;
}

const ScheduleSectionPage: React.FC<Props> = ({ gameId, prizeId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin: Schedule page"
      link={`https://${homeDomain}/admin/games/${gameId}/${prizeId}/schedule`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/${prizeId}/schedule`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <AddBadgeSection prizeId={prizeId} gameId={gameId} />
        <div>
          <ScheduleSection gameId={gameId} badgeId={prizeId} />
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

export default ScheduleSectionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
          prizeId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   console.log("params", params);
  return {
    revalidate: 1,
    props: {
      gameId: params ? params.gameId : "",
      prizeId: params ? params.prizeId : "",
    },
  };
};
