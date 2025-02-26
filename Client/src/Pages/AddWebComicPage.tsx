import { useState } from "react";
import "../css/AddWebComicPage.css";
import ShowRandomWebComic from "../components/ShowRandomWebComic";
import UploadWebcomic from "../components/UploadWebcomic";
import ShowLastWebComic from "../components/ShowLastWebComic";
import AddWebComicByUrl from "../components/AddWebComicByUrl";
import { useLocalStorage } from "usehooks-ts";
import { IComicLocalStorage } from "../utils";

const AddWebComicPage = () => {
  const [activeComponent, setActiveComponent] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

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
          {comicData?.url && (
            <>
              <img src={comicData?.url} />
              <p>{comicData.text}</p>
            </>
          )}
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
