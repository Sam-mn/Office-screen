import { useState } from "react";
import "../css/UploadWebcomic.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
import Popup from "../components/Popup";

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

  const handlePublish = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("source", selectedDirectory);
    formData.append("text", imageText);
    console.log(imageText);
    console.log(selectedDirectory);
    try {
      const response = await axios.post(
        "https://localhost:7078/api/Image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch {
      alert("Error uploading file.");
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
          <button className="publish-button" onClick={handlePublish}>
            Publish
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadWebcomic;
