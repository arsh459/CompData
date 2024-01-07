import MoonIcon from "@components/SvgIcons/MoonIcon";
import SunIcon from "@components/SvgIcons/SunIcon";
import { useBookedSlots } from "@models/slots/useBookedSlot";
import { format } from "date-fns";
import { useRouter } from "next/router";

interface Props {
  onProceed: () => void;
}

const SlotBooked: React.FC<Props> = ({ onProceed }) => {
  const { bookedSlot } = useBookedSlots();
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A]">
      <div className="w-full h-full max-w-md mx-auto z-0 flex flex-col overflow-x-hidden">
        <div className="flex justify-between items-center p-4">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
            className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
            onClick={router.back}
            alt="backIcon"
          />
        </div>
        <div className="flex-1 flex flex-col bg-[#100F1A] relative">
          <div
            className="absolute top-0 left-0 h-4/5 aspect-1 aspect-1 blur-2xl rounded-full -translate-x-1/3 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(70% 70% at 50% 50%, rgba(66, 255, 96, 0.55) 0%, rgba(92, 255, 66, 0) 80%)",
            }}
          />
          <div className="flex-1 flex flex-col items-center">
            <img
              src="https://ik.imagekit.io/socialboat/Component_104_GBmchPySv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673951810513"
              className="w-1/2 aspect-1 object-contain"
              alt="done image"
            />
            <p
              className="text-[#F1F1F1] text-lg mx-4 my-8"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Great! Your booking has been confirmed.
            </p>
            {bookedSlot ? (
              <div className="w-full flex flex-row justify-center">
                <div className="bg-white rounded-xl w-1/4 max-w-[200px] aspect-1 flex flex-col justify-evenly items-center">
                  <p
                    className="text-sm text-[#333333]"
                    style={{ fontFamily: "BaiJamjuree-Regular" }}
                  >
                    {format(bookedSlot.startUnix, "iii")}
                  </p>
                  <p
                    className="text-2xl text-[#333333]"
                    style={{ fontFamily: "BaiJamjuree-Bold" }}
                  >
                    {format(bookedSlot.startUnix, "dd")}
                  </p>
                  <p
                    className="text-sm text-[#333333]"
                    style={{ fontFamily: "BaiJamjuree-Regular" }}
                  >
                    {format(bookedSlot.startUnix, "MMM")}
                  </p>
                </div>
                <div className="w-4 aspect-1" />
                <div className="border border-white rounded-xl w-2/4 overflow-hidden">
                  <div className="flex flex-row justify-center items-center h-1/2">
                    <div className="w-[18px] aspect-1 mr-3">
                      {format(bookedSlot.startUnix, "aaa") === "am" ? (
                        <SunIcon color="#FFFFFF" />
                      ) : (
                        <MoonIcon color="#FFFFFF" />
                      )}
                    </div>
                    <p
                      className="font-bold text-white capitalize text-lg"
                      style={{ fontFamily: "BaiJamjuree-Bold" }}
                    >
                      {format(bookedSlot.startUnix, "aaa") === "am"
                        ? "Morning"
                        : "Evening"}
                    </p>
                  </div>
                  <div className="w-full h-1/2 bg-white rounded-b-lg flex justify-evenly items-center">
                    <p
                      className="text-lg text-[#393939]"
                      style={{ fontFamily: "BaiJamjuree-Bold" }}
                    >
                      {format(bookedSlot.startUnix, "h:mm aaa")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p
                  className="text-[#F1F1F1] text-base mx-4 my-0"
                  style={{ fontFamily: "BaiJamjuree-Medium" }}
                >
                  We will reach out at your scheduled time
                </p>
              </div>
            )}
          </div>
          <div className="p-4">
            <button
              className="w-full rounded-full px-4 py-3 bg-white"
              onClick={onProceed}
            >
              <p
                className="text-[#100F1A] text-base text-center"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Start Health Transformation
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotBooked;
