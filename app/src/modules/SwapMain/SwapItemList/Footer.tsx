import {
  View,
  //  Text
} from "react-native";
// import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
// import { shallow } from "zustand/shallow";

const Footer: React.FC = ({}) => {
  // const { noResults } = useAlgoliaStore(
  //   (state) => ({
  //     noResults:
  //       state.data.length === 0 &&
  //       state.index === "dietsearch" &&
  //       state.action === "none",
  //   }),
  //   shallow
  // );

  return (
    <View className="flex flex-1 justify-center">
      {/* {noResults ? (
        <Text
          className="text-[13px] text-center text-[#FCB750] text-2xl p-6"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          No item as of now but you can add from below
        </Text>
      ) : null} */}
    </View>
  );
};

export default Footer;
