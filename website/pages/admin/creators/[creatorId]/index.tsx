import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";

import { useUserV2 } from "@hooks/auth/useUserV2";
import DefaultLayout from "@layouts/DefaultLayout";
import EditCreator from "@templates/AdminBadgeCreators/EditCreator";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  creatorUID: string | null;
}

const AdminEditCreator: React.FC<Props> = ({ creatorUID }) => {
  const { user, authStatus } = useAuth();

  const remoteUser = useUserV2(creatorUID ? creatorUID : "");

  return creatorUID ? (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/creators/${creatorUID}`}
      canonical={`https://${homeDomain}/admin/creators/${creatorUID}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser.user ? (
        <EditCreator creator={remoteUser.user} />
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
  ) : null;
};

export default AdminEditCreator;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { creatorId: "abc" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const creatorId = params ? params.creatorId : "";

  return {
    revalidate: true,
    props: {
      creatorUID: creatorId,
    },
  };
};
