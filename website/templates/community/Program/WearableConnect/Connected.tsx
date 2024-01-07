import Loading from "@components/loading/Loading";
import { TerraUser } from "@models/Terra/TerraUser";
import { useState } from "react";
import { terraDelete_internalCall } from "server/terra/widget_local";
import { getWearableName } from "./utils";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

interface Props {
  terraUser: TerraUser;
  uid: string;
}

const Connected: React.FC<Props> = ({ terraUser, uid }) => {
  const { text } = getWearableName(terraUser?.provider);
  const [isVisble, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const deleteTerraConnection = async () => {
    setIsVisible(false);
    if (terraUser?.user_id) {
      setLoading(true);
      await terraDelete_internalCall(terraUser?.user_id, uid);
      setLoading(false);
    }
  };

  const onClose = () => setIsVisible(false);
  const onOpen = () => setIsVisible(true);

  return (
    <>
      <PrivacyPolicyModal
        isOpen={isVisble}
        onButtonPress={deleteTerraConnection}
        onCloseModal={onClose}
        onBackDrop={onClose}
      />
      <div className="bg-white rounded-lg shadow-sm px-4 py-1">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : (
          <div className="flex items-center justify-center cursor-pointer">
            <img
              className="w-8 h-8 object-cover"
              src="https://img.icons8.com/color/144/000000/checked-2--v1.png"
            />
            <div>
              <p
                onClick={onOpen}
                className="text-lg text-gray-500 text-center pl-1 font-medium"
              >
                {text} connected
              </p>
              {/* <div className="flex">
                <p className="text-center text-sm text-gray-500">
                  Data privacy policy:
                </p>
                <p
                  className="text-center text-sm text-red-400 pl-1 underline"
                  onClick={onOpen}
                >
                  here
                </p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Connected;
