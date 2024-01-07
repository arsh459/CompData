import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  rating: number;
}

const Rating: React.FC<Props> = ({ rating }) => {
  return (
    <View
      className="w-12 iphoneX:w-16 relative overflow-hidden"
      style={{ aspectRatio: 60 / 20 }}
    >
      <Svg
        className="w-full h-full overflow-hidden"
        viewBox="0 0 60 16"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M60 0H0v12h60V0zM6.19.585a.2.2 0 00-.38 0L4.698 4.008a.2.2 0 01-.19.138H.909a.2.2 0 00-.117.362l2.91 2.115a.2.2 0 01.073.223L2.664 10.27a.2.2 0 00.307.223l2.911-2.115a.2.2 0 01.236 0l2.91 2.115a.2.2 0 00.308-.223L8.225 6.846a.2.2 0 01.072-.223l2.911-2.115a.2.2 0 00-.117-.362H7.492a.2.2 0 01-.19-.138L6.19.585zm11.62 0a.2.2 0 01.38 0l1.112 3.423a.2.2 0 00.19.138h3.599a.2.2 0 01.117.362l-2.91 2.115a.2.2 0 00-.073.223l1.111 3.423a.2.2 0 01-.307.223l-2.911-2.115a.2.2 0 00-.236 0l-2.91 2.115a.2.2 0 01-.308-.223l1.111-3.423a.2.2 0 00-.072-.223l-2.911-2.115a.2.2 0 01.117-.362h3.599a.2.2 0 00.19-.138L17.81.585zm12.38 0a.2.2 0 00-.38 0l-1.112 3.423a.2.2 0 01-.19.138h-3.599a.2.2 0 00-.117.362l2.91 2.115a.2.2 0 01.073.223l-1.111 3.423a.2.2 0 00.307.223l2.911-2.115a.2.2 0 01.236 0l2.91 2.115a.2.2 0 00.309-.223l-1.113-3.423a.2.2 0 01.073-.223l2.911-2.115a.2.2 0 00-.117-.362h-3.599a.2.2 0 01-.19-.138L30.19.585zm11.62 0a.2.2 0 01.38 0l1.112 3.423a.2.2 0 00.19.138h3.599a.2.2 0 01.117.362l-2.91 2.115a.2.2 0 00-.074.223l1.113 3.423a.2.2 0 01-.308.223l-2.911-2.115a.2.2 0 00-.236 0l-2.91 2.115a.2.2 0 01-.309-.223l1.113-3.423a.2.2 0 00-.073-.223l-2.911-2.115a.2.2 0 01.117-.362h3.599a.2.2 0 00.19-.138L41.81.585zm12.38 0a.2.2 0 00-.38 0l-1.112 3.423a.2.2 0 01-.19.138h-3.599a.2.2 0 00-.117.362l2.91 2.115a.2.2 0 01.074.223l-1.113 3.423a.2.2 0 00.308.223l2.911-2.115a.2.2 0 01.236 0l2.91 2.115a.2.2 0 00.309-.223l-1.113-3.423a.2.2 0 01.073-.223l2.911-2.115a.2.2 0 00-.117-.362h-3.599a.2.2 0 01-.19-.138L54.19.585z"
          fill="#D9D9D9"
        />
      </Svg>
      <View className="absolute left-0 right-0 top-0 bottom-0 -z-20">
        <View className="w-full h-full bg-[#464646]" />
      </View>
      <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#FFB546] -z-10">
        <View className="h-full " style={{ width: `${(rating / 5) * 100}%` }} />
      </View>
    </View>
  );
};

export default Rating;