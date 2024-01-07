import Loading from "@components/loading/Loading";
// import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import { useState } from "react";
import { terraWidget_internalCall } from "server/terra/widget_local";
import GivePermissionsModal from "./GivePermissionsModal";

interface Props {
  uid?: string;
  leaderKey?: string;
  eventKey?: string;
  workout?: boolean;
}

const ConnectV2: React.FC<Props> = ({ uid, leaderKey, eventKey, workout }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisble, setIsVisible] = useState<boolean>(false);

  const onClose = () => setIsVisible(false);
  const onOpen = () => setIsVisible(true);

  const router = useRouter();
  const onTerraWidget = async () => {
    setIsVisible(false);
    if (uid) {
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
      <div className="bg-gray-100 border rounded-lg shadow-sm px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : (
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={onOpen}
          >
            <p className="text-orange-500 text-lg font-semibold">
              Connect your wearable
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectV2;
