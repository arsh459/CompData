import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AdvertisementTemplate from "@templates/AdvertisementTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  gameId: string;
}

const Advertisment: React.FC<Props> = ({ gameId }) => {
  const { user, authStatus } = useAuth();
  // console.log(user?.uid && user.role === "admin" && gameId);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/games/${gameId}/advertisement`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/advertisement`}
      img={boatsSEO.img}
      noIndex={true}
      description="Advertisement Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && gameId ? (
        <AdvertisementTemplate gameId={gameId} />
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

export default Advertisment;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: TEAM_ALPHABET_GAME,
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    revalidate: 1,
    props: {
      gameId: params ? params.gameId : "",
    },
  };
};
