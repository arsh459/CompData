import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import { EditObject } from "./interface";
import FieldComp from "./FieldComp";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import { getOnSavePromise } from "./utils";

interface Props {
  visible: boolean;
  onClose: () => void;
  color: string;
  editObject: EditObject;
}

const ProfileEdit: React.FC<Props> = ({
  visible,
  onClose,
  color,
  editObject,
}) => {
  console.log("editObject", editObject);
  const [_, setReRenderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onSave = async () => {
    setLoading(true);
    await Promise.all(
      editObject.fieldsArr.map((each) => getOnSavePromise(each))
    );
    onClose();
  };

  return (
    <CreateModal
      isOpen={visible}
      onCloseModal={onClose}
      onBackdrop={onClose}
      onButtonPress={onClose}
      heading=""
      maxW="max-w-none"
      bgProp="w-screen h-screen bg-white/25 backdrop-blur-3xl"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full max-h-full sm:w-4/5 sm:max-h-[80%] lg:w-2/5 lg:max-h-[80%] flex flex-col p-4">
          <div
            onClick={onClose}
            className="self-end p-2.5 rounded-lg bg-white/50 shadow cursor-pointer"
          >
            <CloseBtn color="#696565" size="medium" />
          </div>

          <div className="flex-1 rounded-lg bg-white/50 overflow-x-hidden overflow-y-scroll scrollbar-hide shadow my-4">
            <h2 className="text-[#383838] text-sm md:text-base font-popR border-b border-black/25 p-3 md:p-4">
              {editObject.heading}
            </h2>
            <div className="p-4 flex flex-col gap-4">
              {editObject.fieldsArr.map((fieldObject, index) => (
                <FieldComp
                  key={`${fieldObject.name
                    .toLowerCase()
                    .replaceAll(" ", "_")}-${index}`}
                  fieldObject={fieldObject}
                  depedentFieldObject={editObject.fieldsArr.find(
                    (each) => each.id === fieldObject.dependencyId
                  )}
                  color={color}
                  setReRenderCount={setReRenderCount}
                />
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            onClick={onSave}
            className="w-full rounded-lg bg-[#0598EB] flex justify-center items-center shadow p-3"
          >
            {loading ? (
              <Loading fill="#FFFFFF" width={24} height={24} />
            ) : (
              <span className="text-white text-center font-popR text-base">
                Save Details
              </span>
            )}
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default ProfileEdit;
