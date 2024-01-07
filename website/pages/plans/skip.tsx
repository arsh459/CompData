import { weEventTrack } from "@analytics/webengage/user/userLog";
import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import Link from "next/link";

const data: { img: string; text: string }[] = [
  {
    img: "https://ik.imagekit.io/socialboat/Union_jVpB9-3U3R.png?updatedAt=1694702166929",
    text: "75% Have reduced medication",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Union-2_KzzRHKPCJb.png?updatedAt=1694702167845",
    text: "95% goal achievement",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Union-1_WqZcMKtK98.png?updatedAt=1694702167735",
    text: "80% Regularise periods",
  },
  {
    img: "https://ik.imagekit.io/socialboat/Vector_M5lVzaifE.png?updatedAt=1694702168624",
    text: "4+ KG Weight loss",
  },
];

const SkipSlotPage = () => {
  return (
    <DefaultLayout
      title="SocialBoat plans for PCOD Treatment"
      description="Our Pricing plans for pcod treatment. We offer 1 month, 3 month and yearly plans that will help you reverse pcos"
      link="https://socialboat.live/plans/skip"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/plans/skip"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <div className="fixed inset-0 z-0 bg-[#5F46C9]">
        <div className="w-full max-w-md mx-auto h-full flex flex-col relative z-0 p-4">
          <div className="flex justify-between items-center">
            <div />
            <Link href={"/start?section=download"}>
              <CloseBtn
                onCloseModal={() =>
                  weEventTrack("SkipSlotBookScreen_bookClick", {})
                }
              />
            </Link>
          </div>

          <img
            src="https://ik.imagekit.io/socialboat/Group%201000001230_vLsxBSWWl.png?updatedAt=1694704277451"
            className="absolute left-0 right-0 top-0 bottom-0 -z-10 object-cover"
          />
          <div className="flex-1 flex flex-col justify-center items-center px-8 py-4">
            <p className="text-[#FEFDFF] text-3xl iphoneX:text-4xl font-medium">
              Over{" "}
              <span className="text-[#C7FF26]">
                25K women have managed PCOS
              </span>
              , you can too!
            </p>

            <div className="w-full p-4">
              {data.map((each) => (
                <div
                  key={each.text}
                  className="flex flex-row items-center pt-4"
                >
                  <img
                    className="w-4 iphoneX:w-5 aspect-1 mr-4 object-contain"
                    src={each.img}
                  />
                  <p className="flex-1 text-[#F5F1FF] text-sm iphoneX:text-base">
                    {each.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={"/consultation?appType=sales&navBack=1"}
            className="bg-[#C7FF26] p-4 rounded-xl"
          >
            <p
              onClick={() =>
                weEventTrack("slotRequest", {
                  source: "webOnboardingSkip_25kWomen",
                })
              }
              className="text-[#6D55D1] text-base text-center"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Book a FREE consultatation
            </p>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SkipSlotPage;
