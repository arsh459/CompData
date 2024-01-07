import DefaultLayout from "@layouts/DefaultLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { homeSEO } from "@constants/seo";
// import GiftTemplate from "@templates/joinBoatTemplate/GiftTemplate";
import { Gift } from "@models/Gift/Gift";
import GiftCardTemplate from "@templates/GiftCard/GiftCardTemplate";
import Link from "next/link";

interface Props {
  gift: Gift | null;
}

const GiftCardPage: React.FC<Props> = ({ gift }) => {
  //   const { user, authStatus } = useAuth();
  // const { title, desc, img, site_name, favIcon } = useUserSEOData(user);
  //   const [deviceType, setDeviceType] = useState<deviceTypes | undefined>(
  //     query.device === "ios" || query.device === "android"
  //       ? query.device
  //       : undefined
  //   );

  //   useEffect(() => {
  //     if (router.isReady && query.device) {
  //       (query.device === "ios" || query.device === "android") &&
  //         setDeviceType(query.device);
  //     }
  //   }, [query.device, router.isReady]);

  // console.log("q", query);

  return (
    <DefaultLayout
      title={"SocialBoat: Your Gift Card"}
      description={"Claim your gift card. Unlock health and fitness"}
      link={`https://socialboat.live/gift/${gift?.id ? gift.id : ""}`}
      canonical={`https://socialboat.live/gift/${gift?.id ? gift.id : ""}`}
      noIndex={true}
      img={homeSEO.img}
    >
      {gift && gift.status ? (
        <GiftCardTemplate gift={gift} />
      ) : (
        <div
          className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF]"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
            404
          </h1>
          <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
          <Link legacyBehavior passHref href="/gift">
            <a className="text-[#FF4266] text-base md:text-xl underline">
              Gift SocialBoat to someone
            </a>
          </Link>
        </div>
      )}
    </DefaultLayout>
  );
};

export default GiftCardPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "id",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const giftId = params ? params.id : "";
  if (giftId && typeof giftId === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const giftObj = await db.collection("gifts").doc(giftId).get();

    const result = giftObj.data() as Gift;

    if (result)
      return {
        revalidate: 1,
        props: {
          gift: result,
        },
      };
  }

  return {
    revalidate: 1,
    props: {
      gift: {},
    },
  };
};
