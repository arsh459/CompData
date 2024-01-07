import UserImage from "@templates/listing/Header/UserImage";
import Link from "next/link";
import { useAllCreators } from "./hooks/useAllCreators";
import { useCreatorsParams } from "./hooks/useCreatorsParams";

const AllCreators = () => {
  const { gameId, badgeId } = useCreatorsParams();
  const { creators } = useAllCreators(gameId, badgeId);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">All Creators</h1>
      <div className="flex flex-wrap">
        {creators.map((creator) => (
          <Link
            href={`/admin/creators/${creator.uid}`}
            key={creator.uid}
            passHref
          >
            <div className="w-max flex justify-between items-center cursor-pointer">
              <UserImage
                image={creator.profileImage}
                name={creator.name}
                boxHeight="h-16"
                boxWidth="w-16"
              />
              <div className="mx-4">
                <h2 className="text-base font-medium">UID: {creator.uid}</h2>
                <h3 className="text-base font-medium">Name: {creator.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCreators;
