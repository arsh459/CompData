import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddSubscriptionId from "@modules/SubscriptionId/AddSubscriptionId";

interface Props {
  uid: string | null;
}

const UserSubscriptionId: React.FC<Props> = ({ uid }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`${uid ? uid : "No name user"}`}
      link={`https://${homeDomain}/admin/u/${uid}/subId`}
      canonical={`https://${homeDomain}/admin/u/${uid}/subId`}
      img={boatsSEO.img}
      noIndex={true}
      description="Subscription Id details of user"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && uid ? (
        <div>
          <AddSubscriptionId uid={uid} />
        </div>
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

export default UserSubscriptionId;

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
      uid: uid,
    },
  };
};
