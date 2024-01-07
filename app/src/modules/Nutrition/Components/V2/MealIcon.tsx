import * as React from "react";
import Svg, { G, Circle, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const MealIcon = () => (
  <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
    <G filter="url(#filter0_d_0_1)">
      <Circle cx={17} cy={13} r={13} fill="white" />
    </G>
    <Path
      d="M16.7499 13.0049H9.57031C9.57031 16.5815 14.0709 19.6567 14.0709 19.6567H16.7499"
      stroke="#6D55D1"
      strokeWidth={0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.6602 13.8223C11.6602 16.4582 14.6205 18.4033 14.6205 18.4033M16.7503 13.005H23.9299C23.9299 16.5816 19.4292 19.6568 19.4292 19.6568H16.7503M12.9059 13.005C12.3835 11.0494 15.8763 9.70511 19.0105 9.28986L19.3171 8.72559L20.5528 10.2275L19.8748 10.3377C19.543 11.4282 17.8819 13.005 17.8819 13.005"
      stroke="#6D55D1"
      strokeWidth={0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.4531 13.005C13.5649 11.9983 14.7323 10.8651 19.1859 9.50488"
      stroke="#6D55D1"
      strokeWidth={0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.3015 9.64497C17.6172 10.4887 15.6535 11.4581 14.2773 13.005M19.6302 10.0435C17.8799 12.421 16.7487 13.005 16.7487 13.005M15.7804 13.005C16.836 12.388 19.4633 9.84057 19.4633 9.84057M20.2713 9.89451L23.4346 7.33082C23.4866 7.28878 23.5297 7.23691 23.5616 7.17818C23.5935 7.11944 23.6135 7.055 23.6204 6.98853C23.6274 6.92207 23.6212 6.85488 23.6021 6.79082C23.5831 6.72675 23.5516 6.66707 23.5095 6.61519C23.4674 6.56328 23.4156 6.52017 23.3568 6.48831C23.2981 6.45645 23.2337 6.43648 23.1672 6.42952C23.1008 6.42257 23.0336 6.42877 22.9695 6.44777C22.9055 6.46678 22.8458 6.49822 22.7939 6.54029L19.6302 9.10359"
      stroke="#6D55D1"
      strokeWidth={0.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs></Defs>
  </Svg>
);
export default MealIcon;
