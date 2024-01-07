import { TerraUser } from "@models/Terra/TerraUser";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { terraDelete_internalCall } from "server/terra/widget_local";
import { useState } from "react";

interface Props {
    uid: string;
    terraUser: TerraUser;
}

const UnpairWearable: React.FC<Props> = ({ uid, terraUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClicik = async () => {
        setIsOpen(false);
        await terraDelete_internalCall(terraUser.user_id, uid);
    };

    return (
        <>
            <CreateModal
                isOpen={isOpen}
                onBackdrop={() => setIsOpen(false)}
                onCloseModal={() => setIsOpen(false)}
                heading=""
                onButtonPress={() => {}}
            >
                <div className="p-4 text-[#335E7D]">
                    <div className="flex justify-center items-center">
                        <img
                            src="https://img.icons8.com/color/48/000000/general-warning-sign.png"
                            alt="warning icon"
                        />
                        <h2 className="pl-4 text-2xl">Warning</h2>
                    </div>
                    <p className="py-4 text-lg">
                        Are you sure you want to disconnect your device?
                    </p>
                    <div className="flex justify-end items-center">
                        <button
                            className="border-2 rounded-lg py-1 px-8 mr-4"
                            onClick={() => setIsOpen(false)}
                        >
                            No
                        </button>
                        <button
                            className="border-2 rounded-lg py-1 px-8 bg-red-200"
                            onClick={handleClicik}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </CreateModal>
            <p
                className="text-base text-red-600 cursor-pointer hover:underline"
                onClick={() => setIsOpen(true)}
            >
                Unpair
            </p>
        </>
    );
};

export default UnpairWearable;
