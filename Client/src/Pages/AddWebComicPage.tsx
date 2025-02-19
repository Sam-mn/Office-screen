import { useState } from "react";
import "../css/AddWebComicPage.css";
import ShowRandomWebComic from "../components/ShowRandomWebComic";
import UploadWebcomic from "../components/UploadWebcomic";
import ShowLastWebComic from "../components/ShowLastWebComic";
import AddWebComicByUrl from "../components/AddWebComicByUrl";

const AddWebComicPage = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);

  return (
    <div className="webcomic-container">
      <div className="webcomic-button-group">
        <button
          onClick={() => setActiveComponent(1)}
          style={{
            backgroundColor: activeComponent === 1 ? "#323232" : undefined,
            color: activeComponent === 2 ? "#fff" : undefined,
          }}
        >
          Show random webcomic
        </button>
        <button
          onClick={() => setActiveComponent(2)}
          style={{
            backgroundColor: activeComponent === 2 ? "#323232" : undefined,
            color: activeComponent === 2 ? "#fff" : undefined,
          }}
        >
          Upload webcomic
        </button>
        <button
          onClick={() => setActiveComponent(3)}
          style={{
            backgroundColor: activeComponent === 3 ? "#323232" : undefined,
            color: activeComponent === 2 ? "#fff" : undefined,
          }}
        >
          Show last webcomic{" "}
        </button>
        <button
          onClick={() => setActiveComponent(4)}
          style={{
            backgroundColor: activeComponent === 4 ? "#323232" : undefined,
            color: activeComponent === 2 ? "#fff" : undefined,
          }}
        >
          Add webcomic url
        </button>
      </div>
      <div className="webcomic-content">
        <div className="prev-webcomic">
          <h2>Previous webcomic</h2>
          <img src="https://imgs.xkcd.com/comics/stromatolites.png" />
          <p>text</p>
        </div>
        {activeComponent === 1 && <ShowRandomWebComic />}
        {activeComponent === 2 && <UploadWebcomic />}
        {activeComponent === 3 && <ShowLastWebComic />}
        {activeComponent === 4 && <AddWebComicByUrl />}
      </div>
    </div>
  );
};

export default AddWebComicPage;
