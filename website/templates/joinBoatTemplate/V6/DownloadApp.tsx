import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  consultationIcon,
  fitnesTipsIcon,
  socialboatLogoColor2,
  workoutIcon,
} from "@constants/icons/iconURLs";
import { LocalUser } from "@hooks/joinBoat/V6/interface";
import Link from "next/link";

const whatYouGet: { text: string; icon: string }[] = [
  { text: "1000+ Video recipes & Tips on women health", icon: fitnesTipsIcon },
  { text: "Free Workout Plan with Follow along videos", icon: workoutIcon },
  {
    text: "Women Health Community & Weekly Challenges",
    icon: consultationIcon,
  },
];

interface Props {
  localUser: LocalUser | undefined;
  noContinue?: boolean;
}

const DownloadApp: React.FC<Props> = ({ localUser, noContinue }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex-1 relative z-0">
        <div className="absolute inset-0 overflow-y-scroll scrollbar-hide flex flex-col">
          <div className="flex">
            <div className="flex justify-center items-center">
              <img
                src={socialboatLogoColor2}
                className="w-2/3 max-w-xs aspect-1 object-contain"
                alt="socialboat logo with gradient "
              />
            </div>

            <h2 className="text-transparent text-xl sm:text-2xl bg-clip-text font-popM bg-gradient-to-r from-[#75E0DF] to-[#7B8DE3] font-black my-6 mx-2">
              {`Congratulations ${localUser?.name}, Your Free Plan is Ready! Download the app to claim`}
            </h2>
          </div>

          <div className="px-2 flex-1">
            <p className="py-4 text-lg">What you will get:</p>

            <div className="grid gap-4">
              {whatYouGet.map((item) => (
                <div
                  key={item.text}
                  className="bg-gradient-to-r from-[#88FAFF] to-[#6D8EFF] rounded-2xl p-px"
                >
                  <div className="bg-[#100F1A] rounded-2xl w-full h-full p-3 flex items-center gap-2">
                    <img
                      src={item.icon}
                      alt={item.text}
                      className="w-8 iphoneX:w-10 aspect-1"
                    />
                    <p className="text-white/80 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {noContinue ? null : (
        <Link href="/myProgram" rel="noreferrer">
          <button
            className="w-full rounded-full px-4 py-3 text-transparent bg-clip-text font-popM text-xs iphoneX:text-sm text-center bg-gradient-to-r from-[#88FAFF] to-[#6D8EFF]"
            onClick={() =>
              weEventTrack(`fScanDownload_continue_on_browser`, {})
            }
          >
            Continue on Browser
          </button>
        </Link>
      )}
      <a
        href="https://socialboat.app.link/download"
        target="_blank"
        rel="noreferrer"
      >
        <button
          className="w-full rounded-full px-4 py-3 text-black font-popM text-xs iphoneX:text-sm text-center bg-gradient-to-r from-[#88FAFF] to-[#6D8EFF]"
          onClick={() => weEventTrack(`fScanDownload_clickDownloadApp`, {})}
        >
          Download App
        </button>
      </a>
    </div>
  );
};

export default DownloadApp;
