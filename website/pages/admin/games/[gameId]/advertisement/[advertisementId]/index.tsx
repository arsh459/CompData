import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AdvertisementFormTemplate from "@templates/AdvertisementTemplate/AdvertisementFormTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  gameId: string;
  advertisementId: string;
}

const AdvertisementForm: React.FC<Props> = ({ gameId, advertisementId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/games/${gameId}/advertisement/${advertisementId}`}
      canonical={`https://${homeDomain}/admin/games/${gameId}/advertisement/${advertisementId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <AdvertisementFormTemplate
          uid={user.uid}
          gameId={gameId}
          advertisementId={advertisementId}
        />
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

export default AdvertisementForm;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: TEAM_ALPHABET_GAME,
          advertisementId: "id",
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
      advertisementId: params ? params.advertisementId : "",
    },
  };
};
