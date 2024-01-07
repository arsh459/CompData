import {
  appStore,
  facebookIconLB,
  instaIconLB,
  linkedinIconLB,
  playStore,
  youtubeIconLB,
} from "@constants/icons/iconURLs";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import CloseBtnV2 from "@modules/WorkoutsV3/GameProgram/CloseBtnV2";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import {
  androidBranchURL,
  iosBranchURL,
} from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import AllLinks from "@templates/WomenTemplate/components/V2/LandingHeader/AllLinks";
import Link from "next/link";
import { useRouter } from "next/router";
import ButtonWithIconV2 from "./ButtonWithIconV2";
import LogoName from "./LogoName";
import { LandingButton } from "./LandingButton";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  btnText?: string;
  btnAction?: () => void;
}

const SocialModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  btnText,
  btnAction,
}) => {
  const onClose = () => setIsOpen(false);

  const router = useRouter();
  const q = router.query as { home?: string; coach?: string };

  const { utm_source } = useCoachAtt();

  const finalRef = q.coach ? `coach=${q.coach}&utm_source=${utm_source}` : "";

  return (
    <CreateModal
      isOpen={isOpen}
      heading=""
      onBackdrop={onClose}
      onButtonPress={onClose}
      onCloseModal={onClose}
      maxW="w-screen"
      bgData="bg-[#1C1B22CC] fixed inset-0 z-50 w-full h-full mx-auto"
      slideDown={true}
    >
      <div className="w-full h-full p-4 backdrop-blur-[19px] overflow-y-scroll flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <LogoName />
          <CloseBtnV2 onCloseModal={onClose} color={"#FFFFFF"} />
        </div>

        <div className="flex flex-col items-center">
          <AllLinks finalRef={finalRef} />

          {btnAction ? (
            <div className="rounded-full backdrop-blur-lg bg-white">
              <LandingButton
                txtColor="#000"
                btnText={btnText ? btnText : "Get Started"}
                btnStyle="whitespace-nowrap text-xs md:text-sm font-popM rounded-full"
                onClickJump={btnAction}
              />
            </div>
          ) : null}

          <div className="w-full justify-center grid gap-4 md:gap-6 md:grid-flow-col auto-cols-[minmax(0,_200px)]">
            <Link passHref href={iosBranchURL}>
              <ButtonWithIconV2
                btnText={"App store"}
                iconImgSrc={appStore}
                onClick={() => {}}
                iconImgSrcWithHttp={true}
                imgStyle="w-5 aspect-1 mr-2"
                textColor={"#000"}
                btnStyle="w-full flex items-center justify-center p-3 my-5 md:my-0 md:mr-10 rounded-lg aspect-[201/47] "
              />
            </Link>
            <Link passHref href={androidBranchURL}>
              <ButtonWithIconV2
                btnText={"Playstore"}
                onClick={() => {}}
                iconImgSrc={playStore}
                iconImgSrcWithHttp={true}
                textColor={"#000"}
                imgStyle="w-5 aspect-1 mr-2"
                btnStyle="w-full flex-1 flex items-center justify-center p-3 rounded-lg"
              />
            </Link>
          </div>
        </div>
        <div className="pb-8">
          <p className="text-white text-center pb-8 text-base font-bail">
            Follow us
          </p>
          <div className="flex items-center justify-evenly w-full ">
            <Link
              passHref
              href={"https://www.youtube.com/channel/UCa93FaRReHYXDqL3-IvDocg"}
            >
              <img src={youtubeIconLB} alt="" className="w-[1.875rem] h-5" />
            </Link>

            <Link
              passHref
              href={"https://www.linkedin.com/company/socialboat-live"}
            >
              <img
                src={linkedinIconLB}
                alt=""
                className="w-[1.625rem] aspect-1 "
              />
            </Link>
            <Link passHref href={"https://www.facebook.com/socialboat.live"}>
              <img src={facebookIconLB} alt="" className="w-7 aspect-1 " />
            </Link>
            <Link passHref href={"https://www.instagram.com/socialboat.live"}>
              <img src={instaIconLB} alt="" className="w-[1.875rem] aspect-1" />
            </Link>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default SocialModal;
