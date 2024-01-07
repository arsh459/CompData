import { weEventTrack } from "@analytics/webengage/user/userLog";
import { seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import {
  androidBranchURL,
  iosBranchURL,
} from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import clsx from "clsx";
import Link from "next/link";
import { deviceTypes } from "./SelectDevice";
// import Header from "./Header";
// import SelectDevice from "./SelectDevice";

interface Props {
  platform: deviceTypes;
}

const SuccessTemplate: React.FC<Props> = ({ platform }) => {
  const onDownloadClick = () => {
    weEventTrack("sbWelcome_clickDownload", {});
  };

  return (
    <DefaultLayout
      title={seoData.inviteSuccessPage.title}
      description={seoData.inviteSuccessPage.description}
      link={seoData.inviteSuccessPage.link}
      canonical={seoData.inviteSuccessPage.link}
      img={seoData.inviteSuccessPage.img}
      siteName="SocialBoat"
      noIndex={false}
    >
      <Link
        href={platform === "ios" ? iosBranchURL : androidBranchURL}
        passHref
      >
        <div
          onClick={onDownloadClick}
          className="w-screen h-screen flex flex-col justify-between items-center text-[#F5F8FF]"
        >
          <div className="flex-1 flex justify-center items-center">
            <div className="w-60 aspect-1 relative z-0">
              <div
                className={clsx(
                  "absolute -top-8 -left-8 -z-10 bg-[#EB703C] rounded-full filter blur-2xl",
                  "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation1"
                )}
              />
              <div
                className={clsx(
                  "absolute -top-8 -right-8 -z-10 bg-[#36A1CF] rounded-full filter blur-2xl",
                  "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation2"
                )}
              />
              <div
                className={clsx(
                  "absolute -bottom-8 -right-8 -z-10 bg-[#FF4874] rounded-full filter blur-2xl",
                  "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation3"
                )}
              />
              <div
                className={clsx(
                  "absolute -bottom-8 -left-8 -z-10 bg-[#8E51FF] rounded-full filter blur-2xl",
                  "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation4"
                )}
              />
              <div className="w-screen h-full relative left-1/2 -translate-x-1/2 flex justify-center items-center p-4">
                <h1 className="sm:w-4/5 lg:w-3/5 text-3xl sm:text-[45px] lg:text-6xl font-extrabold text-center font-baib">
                  Your Payment was successful! Download SocialBoat to get
                  started
                </h1>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer relative z-0 grid place-content-center px-6 py-3 mb-32">
            <div
              className="w-full h-full rounded-2xl p-1 border-white group-hover:scale-[1.1] transition-transform duration-500"
              style={{ borderWidth: 0.3 }}
            >
              <div
                className="w-full h-full rounded-xl p-1 transition-all border-white"
                style={{ borderWidth: 0.6 }}
              >
                <div className="w-full h-full rounded-lg border p-1 transition-all bg-white">
                  <h1 className="px-3 text-black text-base sm:text-lg lg:text-xl whitespace-nowrap font-medium text-center font-baim">
                    Click anywhere to Download App link
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* <div className="w-screen h-screen flex flex-col text-[#F5F8FF] relative z-0">
        <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-hidden">
          <img
            src={
              "https://ik.imagekit.io/socialboat/Screenshot_2022-09-26_at_6.03_2_-Jr7v7s_5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664528664653"
            }
            className="w-full max-w-4xl object-contain"
            alt=""
          />
        </div>
        <Header />
        <div>
          <SelectDevice
            onProceed={() => {}}
            subtitle="Download for your device"
            text="Welcome to SocialBoat"
            link1="https://play.google.com/store/apps/details?id=com.socialboat.socialboat&hl=en_IN&gl=US"
            link2="https://apps.apple.com/gb/app/socialboat/id1635586100"
          />
        </div>
      </div> */}
    </DefaultLayout>
  );
};

export default SuccessTemplate;
