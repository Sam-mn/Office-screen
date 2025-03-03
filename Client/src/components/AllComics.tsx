import { useEffect, useState } from "react";
import "../css/AllComics.css";
import { getAllComics, IAllComic, IComicLocalStorage } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const AllComics = () => {
  const [comics, setComics] = useState<IAllComic[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedComic, setSelectedComic] = useState<IAllComic | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

  useEffect(() => {
    fetchComics(page);
  }, [page]);

  const fetchComics = async (page: number) => {
    setLoading(true);
    try {
      const response = await getAllComics(page, 10);
      setComics(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching comics:", error);
    }
    setLoading(false);
  };

  const handleAddComic = async () => {
    try {
      const socket = new WebSocket("https://localhost:7078/ws/comic");
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: selectedComic?.id,
            url: `https://localhost:7078/static/images/${selectedComic.source}/${selectedComic.imageName}`,
            text: selectedComic?.title,
          })
        );

        setComicData({
          id: selectedComic?.id,
          url: `https://localhost:7078/static/images/${selectedComic.source}/${selectedComic.imageName}`,
          text: selectedComic?.title,
        });
        socket.close();
        setSelectedComic(null);
      };
    } catch {
      throw new Error("Login failed.");
    }
  };

  return (
    <div className="allImagesContainer">
      <div className="grid-container">
        <div className="grid">
          {loading ? (
            <p>loading...</p>
          ) : (
            comics.map((comic) => (
              <div
                key={comic.id}
                className="card"
                onClick={() => setSelectedComic(comic)}
              >
                <img
                  src={`https://localhost:7078/static/images/${comic.source}/${comic.imageName}`}
                  alt={comic.title}
                  className="comic-image"
                />
                <p className="title">{comic.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="pagination fixed-bottom">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          {"<"}{" "}
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </button>
      </div>
      {selectedComic && (
        <div className="preview-overlay" onClick={() => setSelectedComic(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://localhost:7078/static/images/${selectedComic.source}/${selectedComic.imageName}`}
              alt={selectedComic.title}
              className="preview-image"
            />
            <button className="publish-button" onClick={handleAddComic}>
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComics;
