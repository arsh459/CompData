import clsx from "clsx";
import Link from "next/link";

interface Props {
  signOut: () => void;
}

const AccessModal: React.FC<Props> = ({ signOut }) => {
  // const uid = "3oIXsFT2MneNwyFejqZ2erz2wMF2";

  // console.log("rtState", rtState);

  //   useEffect(() => {
  //     setheight(window.innerHeight);
  //   }, []);

  // return <Stream cast={cast} screenHeight={height} />;

  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
      <div className="bg-[#FFFFFF1A] px-7 py-8 rounded-3xl mx-4 md:max-w-[475px] md:mx-auto">
        <p className="text-white text-xl md:text-3xl font-nunitoM">
          {"You don't have access to this program."}
        </p>
        <div className="flex justify-between pt-8 flex-col md:flex-row">
          <Link
            href={"/plans"}
            className={clsx(
              " rounded-lg bg-white flex-1  text-xs iphoneX:text-sm  text-center py-3 whitespace-nowrap text-black font-nunitoB",
              "cursor-pointer"
            )}
          >
            Get Access
          </Link>
          <div className="w-5 h-5"></div>
          <div
            onClick={signOut}
            className={clsx(
              "   rounded-lg bg-[#FFFFFF1A] text-white border-white border text-xs flex-1  text-center py-3 whitespace-nowrap font-nunitoB",
              "cursor-pointer"
            )}
          >
            Sign-in from another account
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessModal;
