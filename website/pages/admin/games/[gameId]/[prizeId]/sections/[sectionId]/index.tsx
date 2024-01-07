import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import AddBadgeSection from "@modules/AddBadgeSection";

interface Props {
  gameId: string;
  prizeId: string;
  sectionId: string;
}

const SectionAddPage: React.FC<Props> = ({ gameId, prizeId, sectionId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Add Sections for Workout Badge"
      link={`https://${homeDomain}/admin/games/${gameId}/${prizeId}/sections/${sectionId}`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/${prizeId}/sections/${sectionId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="An admin page to manage Workout Sections"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <GameBadges uid={user.uid} gameId={gameId} prizeId={prizeId} />
        //  <div>
        //                   <p>
        //                       userId: <strong>{user.uid}</strong>
        //                   </p>
        //                   <p>
        //                       prizeId: <strong>{prizeId}</strong>
        //                   </p>
        //                   <p>
        //                       sectionId: <strong>{sectionId}</strong>
        //                   </p>
        //               </div>
        <>
          <AddBadgeSection
            gameId={gameId}
            prizeId={prizeId}
            sectionId={sectionId}
          />
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

export default SectionAddPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
          prizeId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
          sectionId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      sectionId: params ? params.sectionId : "",
    },
  };
};
