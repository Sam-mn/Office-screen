import { useEffect, useState } from "react";
import "../css/DisplayScreen.css";
import { getComicReq, IImportantNote, IUsers } from "../utils";
import DisplayedUser from "../components/DisplayedUser";
import { IComicLocalStorage } from "../utils";
import { useLocalStorage } from "usehooks-ts";

const DisplayScreen = () => {
  const [users, setUsers] = useState<IUsers[] | null>(null);
  const [comicDetails, setComicDetails] = useState<IComicLocalStorage | null>(
    null
  );
  const [importantNotes, setImportantNotes] = useState<IImportantNote[] | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);

  const getComic = async () => {
    if (comicData) {
      setComicDetails(comicData);
      return;
    } else {
      const response = await getComicReq();
      setComicDetails({
        ...response,
        url: `https://localhost:7078/static/images/${response.source}/${response.imageName}`,
      });

      setComicData({
        ...response,
        url: `https://localhost:7078/static/images/${response.source}/${response.imageName}`,
      });
    }
  };

  useEffect(() => {
    getComic();
  }, []);

  useEffect(() => {
    const comicSocket = new WebSocket("https://localhost:7078/ws/comic");
    const importantNotesSocket = new WebSocket(
      "https://localhost:7078/ws/importantNotes"
    );

    comicSocket.onopen = () => console.log("Connected to WebSocket");
    importantNotesSocket.onopen = () => console.log("Connected to WebSocket");

    comicSocket.onmessage = (event) => {
      console.log("New message:", event.data);
      setComicDetails(JSON.parse(event.data));
    };

    importantNotesSocket.onmessage = (event) => {
      console.log("New message:", event.data);
      setImportantNotes(JSON.parse(event.data));
    };

    comicSocket.onclose = () => console.log("Comic WebSocket disconnected");
    importantNotesSocket.onclose = () =>
      console.log("Important Notes WebSocket disconnected");

    return () => {
      comicSocket.close();
      importantNotesSocket.close();
    };
  }, []);

  useEffect(() => {
    setUsers([
      {
        id: "1",
        name: "Ammar",
        UserStatus: "In office",
        startDate: "2021-09-01",
        endDate: "2021-09-01",
      },
      {
        id: "2",
        name: "Daniel",
        UserStatus: "Away",
        startDate: "2021-09-01",
        endDate: "2021-09-01",
      },
      {
        id: "3",
        name: "Samer",
        UserStatus: "Busy",
        startDate: "2021-09-01",
        endDate: "2021-09-01",
      },
    ]);
  }, []);

  return (
    <div className="display-screen">
      <div className="users-container">
        {users?.map((user) => (
          <DisplayedUser {...user} key={user.id} />
        ))}
      </div>
      <div className="info-container">
        <div className="importantNotes">
          <h2>Important Notes</h2>
          {importantNotes?.length === 0 && <p>No notes available</p>}
          <ul>
            {importantNotes?.map((note) => (
              <li key={note.id}>{note.note}</li>
            ))}
          </ul>
        </div>
        <div className="middleDiv">
          {comicDetails === null && <p>coming soon...</p>}
          {comicDetails?.url && <img src={comicDetails.url} />}
          {comicDetails?.text && <p>{comicDetails.text}</p>}
        </div>
        <div className="MenuDiv">
          <h2>Lunch menu</h2>
          <ul className="menu-list">
            <li className="menu-item">
              <h3 className="item-name">Pasta casareche</h3>
              <p className="item-description">
                med skinksås (går att få glutenfri)
              </p>
              <p className="item-price">115 kr</p>
              <ul className="item-tags">
                <li>Laktosfri</li>
              </ul>
            </li>
            <li className="menu-item">
              <h3 className="item-name">Tapenade bakad alaska pollock</h3>
              <p className="item-description">med citronsås och potatis</p>
              <p className="item-price">115 kr</p>
              <ul className="item-tags">
                <li>Glutenfri</li>
                <li>Laktosfri</li>
              </ul>
            </li>
            <li className="menu-item">
              <h3 className="item-name">Pasta casareche</h3>
              <p className="item-description">
                med vegansås (går att få glutenfri)
              </p>
              <p className="item-price">115 kr</p>
              <ul className="item-tags">
                <li>Laktosfri</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
