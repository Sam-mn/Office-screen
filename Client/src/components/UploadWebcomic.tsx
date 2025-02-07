import { useState } from "react";
import "../css/UploadWebcomic.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

const UploadWebcomic = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="upload-container">
      <input type="text" placeholder="Add text" className="text-input" />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="upload-Img-input"
      />

      {image && (
        <div className="image-preview">
          <button className="remove-btn" onClick={handleRemoveImage}>
            <RiDeleteBin5Fill size={20} />
          </button>
          <img src={image} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadWebcomic;
