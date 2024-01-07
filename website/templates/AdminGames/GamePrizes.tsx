import { useState } from "react";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import CloseBtn from "@templates/community/Program/Feed/CloseBtn";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { Badge, SBPrize } from "@models/Prizes/PrizeV2";

interface Props {
  uid: string;
  formData: Badge;
  setFormData: (data: Badge) => void;
}

const GamePrizes: React.FC<Props> = ({ uid, formData, setFormData }) => {
  const [addPrize, setAddPrize] = useState<boolean>(false);

  const [prizeMedia, setPrizeMedia] = useState<
    (CloudinaryMedia | AWSMedia | undefined)[]
  >([]);
  const [prizeDescription, setPrizeDescription] = useState<string>();
  const [prizeBrand, setPrizeBrand] = useState<string>();
  const [prizeName, setPrizeName] = useState<string>();
  const [prizeLevel, setPrizeLevel] = useState<number>();

  const handleSavePrize = () => {
    if (
      prizeMedia.length > 0 &&
      prizeMedia[0] &&
      prizeDescription &&
      prizeBrand &&
      prizeName
    ) {
      const remoteSBPrize: SBPrize = {
        level: prizeLevel,
        description: prizeDescription,
        brand: prizeBrand,
        name: prizeName,
        media: prizeMedia[0],
      };
      const remoteSBPrizes: SBPrize[] = [...formData.prizes, remoteSBPrize];
      setFormData({ ...formData, prizes: remoteSBPrizes });
      setPrizeMedia([]);
      setPrizeDescription(undefined);
      setPrizeBrand(undefined);
      setPrizeName(undefined);
      setPrizeLevel(undefined);
      setAddPrize(false);
    }
  };

  const onUpload = (media: (CloudinaryMedia | AWSMedia | undefined)[]) => {
    setPrizeMedia((prev) => [...prev, ...media]);
  };

  const onDelete = (media: CloudinaryMedia | AWSMedia) => {
    setPrizeMedia((prev) => prev.filter((each) => each?.id !== media.id));
  };

  const onDeletePrize = (prize: SBPrize) => {
    const remoteSBPrizes: SBPrize[] = formData.prizes.filter(
      (each: SBPrize) => each !== prize
    );
    setFormData({ ...formData, prizes: remoteSBPrizes });
  };

  const onEditPrize = (prize: SBPrize) => {
    const remoteSBPrizes: SBPrize[] = formData.prizes.filter(
      (each: SBPrize) => each !== prize
    );
    setFormData({ ...formData, prizes: remoteSBPrizes });
    setPrizeDescription(prize.description);
    setPrizeBrand(prize.brand);
    setPrizeName(prize.name);
    setPrizeLevel(prize.level);
    setPrizeMedia([prize.media]);
    setAddPrize(true);
  };

  return (
    <div className="border p-4">
      <h2 className="font-bold px-2">Prizes :</h2>

      {addPrize ? null : (
        <button
          className="m-2 px-6 py-0.5 border bg-slate-200 rounded-md"
          onClick={() => setAddPrize(true)}
        >
          Add Prize
        </button>
      )}

      {addPrize ? (
        <div>
          <div className="flex items-center p-4">
            <label className="pr-2">prize Brand :</label>
            <input
              type="string"
              className="border rounded-md"
              name="brand"
              value={prizeBrand}
              onChange={(e) => setPrizeBrand(e.target.value)}
            />
          </div>
          <div className="flex items-center p-4">
            <label className="pr-2">prize Name :</label>
            <input
              type="string"
              className="border rounded-md"
              name="name"
              value={prizeName}
              onChange={(e) => setPrizeName(e.target.value)}
            />
          </div>
          <div className="flex items-center p-4">
            <label className="pr-2">prize Description :</label>
            <input
              type="string"
              className="border rounded-md"
              name="description"
              value={prizeDescription}
              onChange={(e) => setPrizeDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center p-4">
            <label className="pr-2">prize Level :</label>
            <input
              type="number"
              className="border rounded-md"
              name="level"
              value={prizeLevel}
              onChange={(e) => setPrizeLevel(parseInt(e.target.value))}
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
              Save Prize
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

      {formData.prizes.length > 0 ? (
        <div className="grid grid-flow-col auto-cols-fr">
          {formData.prizes.map((each, index) => (
            <div
              key={each.name}
              className=" m-1 p-2 bg-gray-100 rounded-lg flex flex-col justify-center items-center"
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
                media={each.media}
                width={100}
                height={100}
                alt="prise image"
              />
              <p className="py-2">{each.name}</p>
              <p>{each.description}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default GamePrizes;
