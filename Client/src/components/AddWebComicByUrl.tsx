import { useState } from "react";
import "../css/AddWebComicByUrl.css";
import { handlePublishImageFromUrl } from "../utils";
import { IComicLocalStorage } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const AddWebComicByUrl = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [imageText, setImageText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;

    if (!/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)) {
      setError("Invalid image format.");
      setImageUrl("");
      return;
    }

    const isValid = await validateImageUrl(url);

    if (isValid) {
      setImageUrl(url);
      setError("");
    } else {
      setError("Invalid image URL or broken link.");
      setImageUrl("");
    }
  };

  const handleAddComic = async () => {
    try {
      if (!imageUrl) {
        setError("Please enter a valid image URL.");
        return;
      }
      const response = await handlePublishImageFromUrl(imageUrl, imageText);

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
        console.log(response?.data.filePath);

        setComicData({
          id: response?.data.id,
          url: `https://localhost:7078/static/${response?.data.filePath}`,
          text: imageText,
        });

        socket.close();
      };

      if (response?.status === 200) alert("Image uploaded successfully");
    } catch {
      throw new Error("Login failed.");
    }
  };

  return (
    <div className="webcomic-form-url">
      <input
        type="text"
        placeholder="Add a comic url"
        value={imageUrl || ""}
        onChange={handleChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <>
          <img src={imageUrl} />
          <input
            type="text"
            placeholder="Add text"
            value={imageText}
            onChange={(e) => setImageText((e.target as HTMLInputElement).value)}
          />
          <button onClick={handleAddComic}>Publish</button>
        </>
      )}
    </div>
  );
};

export default AddWebComicByUrl;
