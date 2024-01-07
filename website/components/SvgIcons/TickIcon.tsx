interface Props {
  color?: string;
}

export const TickIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-3.703-7.177a1.023 1.023 0 01-.096-.11l-3.905-4.098a1.07 1.07 0 111.55-1.477l3.275 3.435 8.278-8.278a1.009 1.009 0 111.426 1.427l-9.101 9.101a1.009 1.009 0 01-1.427 0z"
        fill={color ? color : "#fff"}
      />
    </svg>
  );
};

export default TickIcon;
