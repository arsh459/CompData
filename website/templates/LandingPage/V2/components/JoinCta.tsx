import { weEventTrack } from "@analytics/webengage/user/userLog";
import { appStore, playStore } from "@constants/icons/iconURLs";
import Link from "next/link";
import ButtonWithIconV2 from "./ButtonWithIconV2";

interface Props {
  origin: string;
}

const JoinCta: React.FC<Props> = ({ origin }) => {
  const onIOS = () => {
    weEventTrack("landing_clickIOS", {});
  };
  const onAndroid = () => {
    weEventTrack("landing_clickAndroid", {});
  };

  return (
    <div className="w-full justify-center grid gap-4 sm:gap-6 sm:grid-flow-col auto-cols-[minmax(0,_200px)] pt-10 ">
      <Link passHref href={`/start?origin=${origin}&device=ios`}>
        <ButtonWithIconV2
          btnText={"IOS"}
          onClick={onIOS}
          iconImgSrc={appStore}
          iconImgSrcWithHttp={true}
          imgStyle="w-5 aspect-1 mr-2"
          textColor={"#000"}
          btnStyle="w-full flex items-center justify-center p-3 mb-5 md:mb-0 md:mr-10 rounded-lg aspect-[201/47]"
        />
      </Link>
      <Link passHref href={`/start?origin=${origin}&device=android`}>
        <ButtonWithIconV2
          onClick={onAndroid}
          btnText={"Android"}
          iconImgSrc={playStore}
          iconImgSrcWithHttp={true}
          textColor={"#000"}
          imgStyle="w-5 aspect-1 mr-2"
          btnStyle="w-full flex-1 flex items-center justify-center p-3 rounded-lg"
        />
      </Link>
    </div>
  );
};

export default JoinCta;
