import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import EditVoucher from "@modules/EditVoucher/EditVoucher";
// import GameBadges from "@templates/AdminGames/GameBadges";

interface Props {
  voucherId: string;
}

const VoucherPage: React.FC<Props> = ({ voucherId }) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin//admin/vouchers/${voucherId}/`}
      canonical={`https://${homeDomain}/admin//admin/vouchers/${voucherId}/`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <AddWinners prizeId={prizeId} gameId={gameId} />
        // <p>
        //   Voucher
        //   {voucherId}

        // </p>
        <EditVoucher
          uid={user.uid}
          voucherId={voucherId !== "addNew" ? voucherId : ""}
        />
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

export default VoucherPage;
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          voucherId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13",
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
      voucherId: params ? params.voucherId : "",
    },
  };
};
