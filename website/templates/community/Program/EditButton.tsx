interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const EditButton: React.FC<Props> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center">
      <div onClick={onEdit}>
        <img
          className="w-4 h-4 object-cover cursor-pointer"
          src="https://img.icons8.com/material-outlined/192/000000/edit--v1.png"
        />
      </div>

      <div className="pl-2" onClick={onDelete}>
        <img
          className="w-4 h-4 object-cover cursor-pointer"
          src="https://img.icons8.com/material-outlined/192/000000/delete-sign.png"
        />
      </div>
    </div>
  );
};

export default EditButton;
