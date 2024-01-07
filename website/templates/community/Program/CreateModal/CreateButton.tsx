interface Props {
  onClick: () => void;
}

const CreateButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-blue-400 shadow-2xl rounded-full p-4 cursor-pointer flex justify-center items-center"
    >
      {/* <img
        src="https://img.icons8.com/ios-filled/192/000000/edit--v1.png"
        className="w-6 h-6 object-cover"
      /> */}

      {/* <img src= /> */}

      <img
        className="w-8 h-8 md:w-10 md:h-10 object-cover"
        src="https://img.icons8.com/material/96/ffffff/pencil--v1.png"
      />
    </div>
  );
};

export default CreateButton;
