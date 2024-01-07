import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { useAuth } from "@hooks/auth/useAuth";
import BookingPage from "@modules/Bookings/BookingPage";

interface Props {
  slotId: string;
  bookingId: string;
}

const SlotBookingPage: React.FC<Props> = ({ slotId, bookingId }) => {
  // console.log("q", query);

  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/slotIds/${slotId}/bookings/${bookingId}`}
      canonical={`https://${homeDomain}/admin/slotIds/${slotId}/bookings/${bookingId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <>
          <BookingPage slotId={slotId} bookingId={bookingId} />
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

export default SlotBookingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slotId: "slotId", bookingId: "bookingId" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      slotId: params && params.slotId ? params.slotId : "",
      bookingId: params && params.bookingId ? params.bookingId : "",
    },
  };
};
