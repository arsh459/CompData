import { View, Text, TouchableOpacity } from "react-native";

import ProgressBar from "@components/ProgressBar";
import ImageWithURL from "@components/ImageWithURL";
import { pdfIcon } from "@constants/imageKitURL";
import CloseIcon from "@components/SvgIcons/CloseIcon";
import { formatFileSize } from "./utils";
import clsx from "clsx";
interface Props {
  name?: string;
  progress: number;
  canDelete: boolean;
  onDelete?: () => void;
  size?: number;
  noIcon?: boolean;
  styleTw?: string;
}
const PdfUploadCard: React.FC<Props> = ({
  progress,
  onDelete,
  canDelete,
  name,
  size,
  noIcon,
  styleTw,
}) => {
  return (
    <View
      className={clsx(
        " w-full   flex flex-row items-center justify-between rounded-xl p-4 px-2",
        styleTw ? styleTw : "bg-[#343150]"
      )}
    >
      {noIcon ? null : (
        <ImageWithURL
          source={{ uri: pdfIcon }}
          className="w-1/6 aspect-square"
        />
      )}
      <View className="flex-[.8] ">
        <Text
          className="text-[#F1F1F1] text-sm "
          style={{ fontFamily: "Nunito-SemiBold" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        {size ? (
          <Text
            className="text-[#F1F1F1] text-sm pb-2.5"
            style={{ fontFamily: "Nunito-SemiBold" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formatFileSize(size)}
          </Text>
        ) : null}

        {progress >= 0 && progress < 1 ? (
          <ProgressBar
            height={1}
            // progress={uploadProgress}
            heightOfContainer={10}
            progress={progress}
            activeColor="#0085FF"
            inActiveColor="#FFFFFF1A"
          />
        ) : null}
      </View>
      {canDelete && onDelete ? (
        <TouchableOpacity onPress={onDelete} className="w-[6%]">
          <View className="w-3 aspect-square ">
            <CloseIcon color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default PdfUploadCard;
