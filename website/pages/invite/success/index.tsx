import { rectWomenImg, seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import SuccessTemplate from "@templates/PaymentTemplate/SuccessTemplate";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const platform = router.query.platform as deviceTypes;

  return (
    <DefaultLayout
      title={seoData.castPage.title}
      description={seoData.castPage.description}
      link={seoData.castPage.link}
      canonical={seoData.castPage.link}
      img={seoData.castPage.img}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <div
        className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF] font-baib"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        <SuccessTemplate platform={platform} />
      </div>
    </DefaultLayout>
  );
};

export default Success;
