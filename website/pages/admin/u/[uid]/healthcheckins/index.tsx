import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import UserHealthCheckinTemplate from "@templates/HealthCheckinTemplate/UserHealthCheckinTemplate";
interface Props {
  userId: string;
}
const AdminCheckins: React.FC<Props> = ({ userId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/u/${userId}/healthcheckins`}
      canonical={`https://${homeDomain}/admin/u/${userId}/healthcheckins`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && userId ? (
        <UserHealthCheckinTemplate userId={userId} />
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

export default AdminCheckins;
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   console.log("params", params);
  const uid = params ? params.uid : "";
  return {
    revalidate: 1,
    props: {
      userId: uid,
    },
  };
};
