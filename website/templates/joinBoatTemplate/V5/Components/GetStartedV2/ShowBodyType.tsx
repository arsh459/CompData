import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import { BodyTypesId } from "@constants/Avatar/utils";

interface Props {
  bodyTypeId: BodyTypesId;
  gender: "male" | "female";
}

const ShowBodyType: React.FC<Props> = ({ bodyTypeId, gender }) => {
  const obj = BodyTypeData[bodyTypeId];

  return (
    <div className="w-[45%] flex flex-col justify-center items-center">
      <img
        src={obj.image[gender]}
        className="w-full max-h-[200px] aspect-[200/250] object-contain"
      />
      <div className="h-12 flex justify-center items-center">
        <h5
          className="text-white text-center text-base line-clamp-2"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {obj.name}
        </h5>
      </div>
    </div>
  );
};

export default ShowBodyType;
