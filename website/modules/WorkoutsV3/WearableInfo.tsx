import { useRouter } from "next/router";
import WaveBtn from "@components/WaveBtn";
import { terraWidget_internalCall } from "server/terra/widget_local";
import { useState } from "react";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  //   gotoComponent: () => void;
  uid: string;
  leaderKey: string;
  eventKey: string;
}

const WearableInfo: React.FC<Props> = ({
  //   gotoComponent,
  uid,
  leaderKey,
  eventKey,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onTerraWidget = async () => {
    //   setIsVisible(false);
    if (uid && leaderKey) {
      setLoading(true);

      try {
        const res = await terraWidget_internalCall(
          uid,
          leaderKey,
          eventKey,
          true
        );

        if (res && res.url) {
          router.push(res.url);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center relative">
      <h1 className="text-3xl text-center">Connect your wearable</h1>
      <p className="w-2/3 text-xl text-center leading-tight my-8">
        Note : Give all permissions during the pairing
      </p>
      <p className="text-center leading-tight">
        Your privacy is important to us. This information will not be shared
        with any third party.
      </p>
      <div className="max-w-md mx-auto relative -left-4 top-0 w-screen bg-[#EBEBEB] my-6">
        <h5 className="text-center text-xl p-2 pt-4">Watches we support</h5>
        <div className="aspect-1 flex justify-evenly items-center flex-wrap overflow-auto">
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/unnamed_-tkP032GG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232950997`}
              alt="google fit"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/fitbit-logo-png-transparent_XWGR7-TvI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232945903`}
              alt="fitbit"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/Garmin-Logo_VzoflZQXv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232946008`}
              alt="garmin"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/Peloton__company_-Logo.wine__-YOHlvCw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232948165`}
              alt="peloton"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/wahoo-logo_de1o23mwY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651297420070`}
              alt="wahoo"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/zwf_hz_rgb_pos_blk_oxmt6A9FT9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232951067`}
              alt="zwift"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/suunto-2-logo_TDvWnTFy0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232950830`}
              alt="suunto"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/libre-logo-horizontal__1__ClNXaEfYq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232946321`}
              alt="freestyle libre"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/withings-logo_hi9xw5_b4yO73-ZM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232951006`}
              alt="withings"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/OuraLogo_grande_bUt4HOt4E.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232947944`}
              alt="oura"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/logo-trainingpeaks_BBmBWPQhF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232947580`}
              alt="trainingpeaks"
            />
          </div>
          <div className="w-32 m-4">
            <img
              src={`https://ik.imagekit.io/socialboat/Eight_logo-02_18E8ttRUA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651232945891`}
              alt="polar and eight"
            />
          </div>
        </div>
      </div>
      <div className="h-20" />
      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 bg-white py-2">
        <div className="h-20 w-1/2 m-auto">
          <WaveBtn
            gotoComponent={() => {
              onTerraWidget();
              weEventTrack("startWorkout_connectWearable", {
                screenName: "wearable_info",
              });
            }}
            text={loading ? "Loading..." : "Proceed"}
          />
        </div>
      </div>
    </div>
  );
};

export default WearableInfo;
