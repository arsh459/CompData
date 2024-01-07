import ImageWithURL from "@components/ImageWithURL";
import UseModal from "@components/UseModal";
import { downIconWhite } from "@constants/imageKitURL";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Values {
  id: string;
  name: string;
}
export interface Props {
  onChange?: (data: string) => void;
  onOptionChange?: (data: Values) => void;
  formLabel: string;
  formInputTel?: boolean;
  isOptions?: boolean;
  value: string;
  optionValues?: Values[];
}

const FormInput: React.FC<Props> = ({
  onChange,
  formInputTel,
  value,
  formLabel,
  isOptions,
  optionValues,
  onOptionChange,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const onClose = () => {
    setShowOptions(false);
  };
  const toggleModal = () => setShowOptions((prev) => !prev);
  return (
    <>
      <View className="mx-4 relative pt-2 mb-4">
        <Text className=" absolute left-4 pr-2 z-50 top-0 text-[#FFFFFF6B] bg-[#232136]">
          {formLabel}
        </Text>

        {isOptions ? (
          <View className=" py-3 px-4 rounded-xl border border-[#FFFFFF80]">
            <Text className="text-white">{value}</Text>
          </View>
        ) : (
          <TextInput
            onChangeText={onChange}
            inputMode={formInputTel ? "tel" : "text"}
            multiline={true}
            value={value}
            className="text-white/80 py-4 px-4 rounded-xl border border-[#FFFFFF80]"
          />
        )}

        {isOptions ? (
          <TouchableOpacity
            className="absolute right-2  top-4 p-2 "
            onPress={toggleModal}
          >
            <ImageWithURL
              className=" w-2 h-2 aspect-square"
              source={{ uri: downIconWhite }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {isOptions ? (
        <UseModal
          width="w-2/3"
          height="h-1/3"
          blurAmount={10}
          bgColor={"#232136"}
          visible={showOptions}
          onClose={onClose}
          hasHeader={true}
          tone="dark"
          // classStr="flex justify-center items rounded"
        >
          <>
            <Text className="text-center text-white text-base p-4">
              {formLabel}
            </Text>

            <View className="rounded p-2 bg-[#343150] flex-1 flex w-full">
              <ScrollView>
                {optionValues &&
                  optionValues.map((item: Values) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onOptionChange && onOptionChange(item);
                          toggleModal();
                        }}
                        key={item.id}
                      >
                        <View
                          className={`mb-2 rounded-lg ${
                            value === item.name ? "bg-[#FFFFFF]/20" : ""
                          } w-full flex items-center py-2`}
                        >
                          <Text className=" text-white/80 text-base">
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </>
        </UseModal>
      ) : null}
    </>
  );
};

export default FormInput;
