import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import GoalAchievmentPath from "@templates/admin/GoalAchievmentPath";

interface Props {
  uid: string;
}

const Path: React.FC<Props> = ({ uid }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={"Admin page for Roadmap"}
      link={`https://${homeDomain}/admin/u/${uid}/path`}
      canonical={`https://${homeDomain}/admin/u/${uid}/path`}
      img={boatsSEO.img}
      noIndex={true}
      description="Achivement Path Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && uid ? (
        <GoalAchievmentPath uid={uid} />
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : uid
            ? "Something went wrong"
            : "No such User"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default Path;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";

  return {
    revalidate: 1,
    props: {
      uid: uid ? uid : "",
    },
  };
};
