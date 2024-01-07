import Link from "next/link";
import { useRouter } from "next/router";
import LandingLinksV2 from "./LandingLinksV2";
import LogoName from "./LogoName";
interface Props {
  route?: string;
  btnText?: string;
}

const LandingHeaderV2: React.FC<Props> = ({ route, btnText }) => {
  const router = useRouter();

  const q = router.query as { home?: string };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-black/10 backdrop-blur-2xl max-h-20">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 py-3">
        <Link passHref href={q.home ? `/${q.home}` : `/`}>
          <LogoName />
        </Link>
        <LandingLinksV2 route={route} btnText={btnText} />
      </div>
    </div>
  );
};

export default LandingHeaderV2;
