import * as React from "react";
interface Props {
  color?: string;
}
const WeightIconSvg: React.FC<Props> = ({ color }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 23 23"
      fill={color ? color : "#F19B38"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 5.09c-1.443 0-2.6 1.134-2.6 2.546 0 1.413 1.157 2.546 2.6 2.546s2.6-1.133 2.6-2.546c0-1.412-1.157-2.545-2.6-2.545zM26 0v6.364h-2.6V3.818H2.6v2.546H0V0h2.6v2.545h20.8V0H26zm-9.1 13.058V28h-2.6v-6.364h-2.6V28H9.1V13.058c-2.691-1.387-4.55-4.149-4.55-7.33V5.09h2.6v.636c0 3.182 2.6 5.727 5.85 5.727 3.25 0 5.85-2.545 5.85-5.727v-.636h2.6v.636c0 3.182-1.859 5.944-4.55 7.331z" />
    </svg>
  );
};

export default WeightIconSvg;
