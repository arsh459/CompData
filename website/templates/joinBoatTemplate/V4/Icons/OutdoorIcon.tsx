interface Props {
  color?: string;
}

const OutdoorIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 28 33" fill="none">
      <path
        d="M13.511.012c-7.2-.3-13.2 5.3-13.5 12.5-.3 7.2 5.3 13.2 12.5 13.5v-5.2l-5.2-5.2c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l3.8 3.8v-6.2l-2.7-2.7c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l3.3 3.3v3l3.3-3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.7 4.7v9.2c7.2-.3 12.8-6.3 12.5-13.5-.3-7.2-6.3-12.8-13.5-12.5z"
        fill={color ? color : "#F5F8FF"}
      />
      <path
        d="M13.508 26.008h-1v5c0 .6.4 1 1 1s1-.4 1-1v-5h-1z"
        fill={color ? color : "#F5F8FF"}
      />
    </svg>
  );
};

export default OutdoorIcon;
