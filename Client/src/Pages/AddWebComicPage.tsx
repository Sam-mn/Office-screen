import { useState } from "react";
import "../css/AddWebComicPage.css";
import ShowRandomWebComic from "../components/ShowRandomWebComic";
import UploadWebcomic from "../components/UploadWebcomic";

const AddWebComicPage = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);

  return (
    <div className="webcomic-container">
      <div className="webcomic-button-group">
        <button onClick={() => setActiveComponent(1)}>
          Show random webcomic
        </button>
        <button onClick={() => setActiveComponent(2)}>Upload webcomic</button>
        <button onClick={() => setActiveComponent(3)}>
          Show last webcomic{" "}
        </button>
        <button onClick={() => setActiveComponent(4)}>Add webcomic url</button>
      </div>
      <div className="webcomic-content">
        <div className="prev-webcomic">
          <img src="https://imgs.xkcd.com/comics/stromatolites.png" />
          <p>text</p>
        </div>
        {activeComponent === 1 && <ShowRandomWebComic />}
        {activeComponent === 2 && <UploadWebcomic />}
      </div>
    </div>
  );
};

export default AddWebComicPage;
