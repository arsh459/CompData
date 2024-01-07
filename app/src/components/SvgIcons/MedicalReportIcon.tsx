import Svg, { Path , Mask, G}  from "react-native-svg";
interface Props {
  color?: string;
}
export const MedicalReportIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill={color ? color : "#fff"}
    >
      <Mask
        id="mask0_13322_3837"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="14"
        height="15"
      >
        <Path
          d="M6.80392 14.0588H1.72549C1.53308 14.0588 1.34855 13.9824 1.21249 13.8463C1.07644 13.7103 1 13.5257 1 13.3333V1.72549C1 1.53308 1.07644 1.34855 1.21249 1.21249C1.34855 1.07644 1.53308 1 1.72549 1H11.8824C12.0748 1 12.2593 1.07644 12.3954 1.21249C12.5314 1.34855 12.6078 1.53308 12.6078 1.72549V5.89706"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M11.7522 8.61722C12.6264 8.61722 13.3352 9.29918 13.3352 10.1407C13.3352 11.2362 12.2796 12.1721 11.7522 12.68C11.4003 13.0184 10.961 13.3572 10.4332 13.6956C9.90578 13.3572 9.46577 13.0184 9.11427 12.68C8.58648 12.1721 7.53125 11.2362 7.53125 10.1407C7.53125 9.29918 8.24005 8.61722 9.11427 8.61722C9.66455 8.61722 10.1495 8.88783 10.4332 9.29845C10.5816 9.08669 10.7791 8.91407 11.0088 8.79542C11.2385 8.67676 11.4936 8.61561 11.7522 8.61722Z"
          fill="white"
          stroke="white"
          stroke-linejoin="round"
        />
        <Path
          d="M3.89844 3.90234H9.70236"
          stroke="white"
          stroke-linecap="round"
        />
      </Mask>
      <G mask="url(#mask0_13322_3837)">
        <Path
          d="M-1.53516 -1.17676H15.8766V16.235H-1.53516V-1.17676Z"
          fill="#F2F6F9"
        />
      </G>
    </Svg>
  );
};

export default MedicalReportIcon;
