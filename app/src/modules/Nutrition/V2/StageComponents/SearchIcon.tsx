import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SearchIcon = () => {
  return (
    <Svg className="w-full aspect-[17/16]" viewBox="0 0 17 16" fill="none">
      <Path
        d="M12.012 10.342a6.5 6.5 0 10-1.397 1.398c.03.04.061.078.097.115l3.85 3.85a1 1 0 101.415-1.414l-3.85-3.85a1.005 1.005 0 00-.115-.099zm.258-3.844a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
        fill="#fff"
      />
    </Svg>
  );
};

export default SearchIcon;
