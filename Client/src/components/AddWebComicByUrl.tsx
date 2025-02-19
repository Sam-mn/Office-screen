import { useState } from "react";
import "../css/AddWebComicByUrl.css";

const AddWebComicByUrl = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

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
          <input type="text" placeholder="Add text" />
          <button>Publish</button>
        </>
      )}
    </div>
  );
};

export default AddWebComicByUrl;
