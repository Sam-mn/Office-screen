import { useState } from "react";
import "../css/UploadWebcomic.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from "../components/Popup";
import { handlePublishImage } from "../utils/requests";

const UploadWebcomic = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [imageText, setImageText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDirectory(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
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

  const handleAddComic = async () => {
    try {
      if (!selectedDirectory) {
        alert("Please select a directory first.");
        return;
      }
      if (!imageText) {
        alert("Please add text first.");
        return;
      }

      const response = await handlePublishImage(
        file,
        selectedDirectory,
        imageText
      );
      if (response?.status === 200) alert("Image uploaded successfully");
    } catch {
      throw new Error("Login failed.");
    }
  };

  return (
    <div className="upload-container">
      <Popup isOpen={isPopupOpen}>
        <h2>Add a new directory</h2>
        <input type="text" placeholder="Write a name" name="psw" required />
        <div className="popup-buttons">
          <button onClick={closePopup} className="add-button">
            Add
          </button>
          <button onClick={closePopup} className="close-button">
            Close
          </button>
        </div>
      </Popup>
      <div className="directory-container">
        <select
          id="directory"
          name="directory"
          className="select-input"
          value={selectedDirectory}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            select a directory
          </option>
          <option value="XKCD">XKCD</option>
          <option value="2024">2024</option>
        </select>
        <button className="add-directory-btn" onClick={openPopup}>
          Add Directory
        </button>
      </div>
      <input
        type="text"
        placeholder="Add text"
        className="text-input"
        value={imageText}
        onChange={(e) => setImageText((e.target as HTMLInputElement).value)}
      />

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
          <button className="publish-button" onClick={handleAddComic}>
            Publish
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadWebcomic;
