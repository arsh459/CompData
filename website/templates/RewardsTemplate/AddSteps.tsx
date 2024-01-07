import { useState } from "react";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { BenefitInterface, RoundInterface } from "@models/Event/Round";

interface Props {
  uid: string;
  formData: RoundInterface;
  setFormData: (data: RoundInterface) => void;
}

const AddSteps: React.FC<Props> = ({ uid, formData, setFormData }) => {
  const [addPrize, setAddPrize] = useState<boolean>(false);

  const [prizeMedia, setPrizeMedia] = useState<
    (CloudinaryMedia | AWSMedia | undefined)[]
  >([]);

  const [prizeName, setPrizeName] = useState<string>();

  const onUpload = (media: (CloudinaryMedia | AWSMedia | undefined)[]) => {
    setPrizeMedia((prev) => [...prev, ...media]);
  };

  const onDelete = (media: CloudinaryMedia | AWSMedia) => {
    setPrizeMedia((prev) => prev.filter((each) => each?.id !== media.id));
  };

  const onDeletePrize = (prize: BenefitInterface) => {
    if (formData?.steps) {
      const remoteSBPrizes: BenefitInterface[] = formData?.steps?.filter(
        (each: BenefitInterface) => each !== prize
      );
      setFormData({ ...formData, steps: remoteSBPrizes });
    }
  };

  const onEditPrize = (prize: BenefitInterface) => {
    if (formData?.steps) {
      const remoteSBPrizes: BenefitInterface[] = formData.steps.filter(
        (each: BenefitInterface) => each !== prize
      );
      setFormData({ ...formData, steps: remoteSBPrizes });
      setPrizeName(prize.text);

      setPrizeMedia([prize.img]);
      setAddPrize(true);
    }
  };
  const handleSavePrize = () => {
    if (prizeMedia.length > 0 && prizeMedia[0] && prizeName) {
      const remoteBenefit: BenefitInterface = {
        text: prizeName,
        img: prizeMedia[0],
      };
      const remoteSBPrizes: BenefitInterface[] = formData?.steps
        ? [...formData.steps, remoteBenefit]
        : [remoteBenefit];
      setFormData({ ...formData, steps: remoteSBPrizes });
      setPrizeMedia([]);

      setAddPrize(false);
    }
  };
  return (
    <div className="border p-4">
      <h2 className="font-bold px-2">Add Steps :</h2>

      {addPrize ? null : (
        <button
          className="m-2 px-6 py-0.5 border bg-slate-200 rounded-md"
          onClick={() => setAddPrize(true)}
        >
          Add Steps
        </button>
      )}

      {addPrize ? (
        <div>
          <div className="flex items-center p-4">
            <label className="pr-2">Step Text :</label>
            <input
              type="string"
              className="border rounded-md"
              name="name"
              value={prizeName}
              onChange={(e) => setPrizeName(e.target.value)}
            />
          </div>

          <div className="p-4">
            <UppyWidgetContainer
              onUpload={onUpload}
              screenName="admin"
              taskName="admin"
              onDelete={onDelete}
              media={prizeMedia}
              uid={uid}
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
              styles="rounded-none bg-red-500 border-none text-white"
              containerStyles="border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            />
          </div>
          <div className="flex justify-between items-center p-4">
            <button
              className="px-6 py-0.5 border bg-slate-200 rounded-md"
              onClick={handleSavePrize}
            >
              Save Step
            </button>
            <button
              className="px-6 py-0.5 border bg-slate-200 rounded-md"
              onClick={() => setAddPrize(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {formData?.steps && formData?.steps.length > 0 ? (
        <div className="grid grid-flow-col auto-cols-fr">
          {formData.steps.map((each, index) => (
            <div
              key={each.text}
              className=" m-1 p-2 bg-gray-100 max-w-sm rounded-lg flex flex-col justify-center items-center"
            >
              <div className="pb-2 self-end">
                <CloseBtn
                  onCloseModal={() => onDeletePrize(each)}
                  tone="dark"
                />
              </div>
              <div
                onClick={() => onEditPrize(each)}
                className="pb-2 self-end cursor-pointer"
              >
                <p className="text-red-500">Edit</p>
              </div>
              <MediaTile
                media={each.img}
                width={100}
                height={100}
                alt="prise image"
              />
              <p className="py-2">{each.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AddSteps;
