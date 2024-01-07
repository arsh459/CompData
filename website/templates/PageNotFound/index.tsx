import Link from "next/link";

interface Props {}

const PageNotFound: React.FC<Props> = ({}) => {
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF] font-baib"
      style={{ fontFamily: "BaiJamjuree-Regular" }}
    >
      <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
        404
      </h1>
      <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
      <Link legacyBehavior passHref href="/">
        <a className="text-[#FF4266] text-base md:text-xl underline">Home</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
