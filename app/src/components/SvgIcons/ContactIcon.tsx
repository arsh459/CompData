import Svg, { Path } from "react-native-svg";

interface Props {
  color?: string;
}

const ContactIcon: React.FC<Props> = ({ color }) => {
  return (
    <Svg className="w-full h-full" viewBox="0 0 15 19" fill="none">
      <Path
        d="M7.5 1.267a6.209 6.209 0 00-4.42 1.855A6.376 6.376 0 001.25 7.6v1.267H2.5c.332 0 .65.133.884.37.234.238.366.56.366.896v3.8c0 .336-.132.659-.366.896a1.242 1.242 0 01-.884.371H1.25c-.332 0-.65-.133-.884-.371A1.275 1.275 0 010 13.933V7.6c0-.998.194-1.986.57-2.908.378-.922.93-1.76 1.627-2.466A7.494 7.494 0 014.63.579a7.414 7.414 0 015.74 0c.91.381 1.737.941 2.433 1.647a7.608 7.608 0 011.626 2.466c.377.922.571 1.91.571 2.908v7.6c0 .84-.33 1.645-.915 2.24a3.104 3.104 0 01-2.21.927H9.207c-.11.192-.267.352-.457.463-.19.112-.406.17-.625.17h-1.25c-.332 0-.65-.134-.884-.371a1.275 1.275 0 010-1.791c.235-.238.552-.371.884-.371h1.25a1.258 1.258 0 011.082.633h2.668c.497 0 .974-.2 1.326-.556.351-.357.549-.84.549-1.344H12.5c-.332 0-.65-.133-.884-.371a1.275 1.275 0 01-.366-.896v-3.8c0-.336.132-.658.366-.895.235-.238.553-.371.884-.371h1.25V7.6c0-.832-.162-1.655-.476-2.424a6.337 6.337 0 00-1.355-2.054 6.244 6.244 0 00-2.027-1.373A6.179 6.179 0 007.5 1.267z"
        fill={color ? color : "#100F1A"}
      />
    </Svg>
  );
};

export default ContactIcon;
