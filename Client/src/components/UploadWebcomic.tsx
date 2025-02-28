import { useEffect, useState } from "react";
import "../css/UploadWebcomic.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Popup from "../components/Popup";
import {
  handlePublishImage,
  getFoldersReq,
  addFolderReq,
} from "../utils/requests";
import { IComicLocalStorage, IFolder } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const UploadWebcomic = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [imageText, setImageText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [newFolder, setNewFolder] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const getFolders = async () => {
    const foldersData = await getFoldersReq();
    setFolders(foldersData);
  };

  useEffect(() => {
    getFolders();
  }, []);

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

      console.log(response);

      const socket = new WebSocket("https://localhost:7078/ws/comic");
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: response?.data.id,
            url: `https://localhost:7078/static/${response?.data.filePath}`,
            text: imageText,
          })
        );
        setComicData({
          id: response?.data.id,
          url: `https://localhost:7078/static/${response?.data.filePath}`,
          text: imageText,
        });
        console.log(response?.data.filePath);
        socket.close();
      };

      if (response?.status === 200) alert("Image uploaded successfully");
    } catch {
      throw new Error("Login failed.");
    }
  };

  const handleAddDirectory = async () => {
    if (newFolder.trim() === "") {
      alert("Folder name cannot be empty");
      return;
    }
    const folderResponse = await addFolderReq(newFolder);
    if (folderResponse.status === 201) {
      getFolders();
      closePopup();
    }
  };

  return (
    <div className="upload-container">
      <Popup isOpen={isPopupOpen}>
        <h2>Add a new directory</h2>
        <input
          type="text"
          placeholder="Write a name"
          name="directory"
          onChange={(e) => setNewFolder(e.target.value)}
          required
        />
        <div className="popup-buttons">
          <button onClick={handleAddDirectory} className="add-button">
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
          {folders.map((folder) => (
            <option key={folder.id} value={folder.folderName}>
              {folder.folderName}
            </option>
          ))}
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
