import React, { ChangeEvent } from "react";

const FilePicker: React.FC<{ onFileSelected: (file: File) => void }> = ({
  onFileSelected,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FilePicker;
