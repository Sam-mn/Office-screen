import { useEffect, useState } from "react";
import { getRandomComicReq, IComic } from "../utils";
import { IComicLocalStorage } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const ShowRandomWebComic = () => {
  const [comicDetails, setComicDetails] = useState<IComic | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

  const getComic = async () => {
    const ComicsData = await getRandomComicReq();
    setComicDetails({
      ...ComicsData,
      filePath: `https://localhost:7078/static/images/${ComicsData.source}/${ComicsData.imageName}`,
    });
  };

  useEffect(() => {
    getComic();
  }, []);

  const handleAddComic = async () => {
    try {
      const socket = new WebSocket("https://localhost:7078/ws/comic");
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: comicDetails?.id,
            url: `${comicDetails?.filePath}`,
            text: comicDetails?.text,
          })
        );

        setComicData({
          id: comicDetails?.id,
          url: `${comicDetails?.filePath}`,
          text: comicDetails?.text,
        });
        socket.close();
      };
    } catch {
      throw new Error("Login failed.");
    }
  };

  return (
    <div className="webcomic-form">
      {!comicDetails?.url || (!comicDetails?.filePath && <p>Loading...</p>)}

      {comicDetails?.url && <img src={comicDetails.url} />}
      {comicDetails?.filePath && <img src={comicDetails.filePath} />}
      <p>{comicDetails?.text}</p>
      {(comicDetails?.url || comicDetails?.filePath) && (
        <button onClick={handleAddComic}>Publish</button>
      )}
    </div>
  );
};

export default ShowRandomWebComic;
