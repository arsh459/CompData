interface Props {
  color?: string;
}

const HomeIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg className="w-full h-full" viewBox="0 0 28 26" fill="none">
      <path
        d="M27.42 12.787L14.7.285A.987.987 0 0014 0a1 1 0 00-.698.285L.58 12.787c-.371.364-.581.86-.581 1.376 0 1.072.886 1.944 1.977 1.944h1.34v8.921a.98.98 0 00.988.972h7.719v-6.804h3.46V26h8.212a.98.98 0 00.988-.972v-8.921h1.34c.525 0 1.029-.204 1.4-.571.769-.76.769-1.99-.003-2.749z"
        fill={color ? color : "#F5F8FF"}
      />
    </svg>
  );
};

export default HomeIcon;
