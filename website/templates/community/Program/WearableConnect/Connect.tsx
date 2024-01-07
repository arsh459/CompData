import Loading from "@components/loading/Loading";
// import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import { useState } from "react";
import { terraWidget_internalCall } from "server/terra/widget_local";
import GivePermissionsModal from "./GivePermissionsModal";

interface Props {
  uid?: string;
  leaderKey: string;
  eventKey?: string;
  workout?: boolean;
}

const Connect: React.FC<Props> = ({ uid, leaderKey, eventKey, workout }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisble, setIsVisible] = useState<boolean>(false);

  const onClose = () => setIsVisible(false);
  const onOpen = () => setIsVisible(true);

  const router = useRouter();
  const onTerraWidget = async () => {
    setIsVisible(false);
    if (uid && leaderKey) {
      setLoading(true);

      try {
        const res = await terraWidget_internalCall(
          uid,
          leaderKey,
          eventKey,
          workout
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
    <>
      <GivePermissionsModal
        isOpen={isVisble}
        onButtonPress={onTerraWidget}
        onCloseModal={onClose}
        onBackDrop={onClose}
      />
      <div className="bg-white rounded-lg shadow-sm px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : (
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={onOpen}
          >
            {/* <img className="w-16 h-16 object-cover" src="https://www.pngarts.com/files/8/White-Apple-Watch-PNG-Image-Background.png" /> */}
            <img
              className="w-16 h-16 object-cover"
              src="https://r7.hiclipart.com/path/1015/343/716/5bbf80833035d-c6b38b5a4bcf2061c0d748dbcbbc051e.png?dl=1"
            />
            {/* <img
              className="w-16 h-16 object-cover"
              src="https://developer.apple.com/design/human-interface-guidelines/watchos/images/activity-rings_2x.png"
            /> */}

            <div>
              <p className="text-xl text-gray-700 text-center font-medium">
                Connect your wearable
              </p>
              <p className="text-center text-sm text-gray-500 underline">
                To account for casual workouts
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Connect;
