import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
import HeaderV2 from "@templates/community/Header/HeaderV2";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { useRouter } from "next/router";
// import Script from "next/script";

interface Props {
  signedInUser: UserInterface;
  authStatus: "SUCCESS";
  games: EventInterface[];
}

const FeedTemplate: React.FC<Props> = ({ signedInUser, authStatus, games }) => {
  const router = useRouter();
  const onGoBack = () => router.back();
  // const { games } = useActiveGames();

  return (
    <div className="max-w-xl relative mx-auto min-h-screen flex flex-col">
      <div className="bg-gradient-to-t from-gray-100 top-0 w-full z-50 left-0 right-0 fixed">
        <HeaderV2
          onSignIn={() => {}}
          onGoBack={onGoBack}
          signedInUserName={signedInUser?.name}
          uid={signedInUser?.uid}
          authStatus={authStatus}
          signedInUserImage={signedInUser?.profileImage}
          signedInUserKey={signedInUser?.userKey}
        />
      </div>
      <div className="h-20" />
      <div className="bg-gradient-to-b from-gray-100 flex-1 p-4">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/feed/${game?.eventKey}`}
            style={{ textDecoration: "none" }}
          >
            <>
              {game.media.length ? (
                <MediaTile
                  width={300}
                  height={getHeight(game.media[0], 300)}
                  alt="media"
                  roundedString="rounded-t-sm"
                  media={game.media[0]}
                />
              ) : null}
              <h2 className="text-2xl text-gray-700 font-bold font-sans">
                {game.name}
              </h2>
              <p className="text-gray-500 line-clamp-2 whitespace-pre-wrap font-sans">
                {game.description}
              </p>
            </>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeedTemplate;
