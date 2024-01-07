import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const RankingIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.333 20H6.667v-9.334A.667.667 0 017.333 10h5.334a.667.667 0 01.666.667V20zm6 0h-6v-3.222A.667.667 0 0114 16.11h5.333a.666.666 0 01.667.667v2.555a.666.666 0 01-.667.667zM6.667 20v-5.445A.667.667 0 006 13.89H.667a.667.667 0 00-.667.666v4.778A.667.667 0 00.667 20h6zM8.673 2.347L9.683.206a.347.347 0 01.634 0l1.01 2.14 2.259.346c.29.045.405.418.195.632L12.148 4.99l.385 2.354c.05.302-.253.533-.513.39L10 6.623l-2.02 1.11c-.259.143-.562-.087-.513-.39l.385-2.353L6.22 3.324c-.211-.214-.095-.587.194-.632l2.26-.344v-.001z"
        fill={color ? color : "#fff"}
        fillOpacity={1}
      />
    </Svg>
  );
};

export default RankingIcon;
