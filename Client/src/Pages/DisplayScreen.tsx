import { useContext, useEffect, useState } from "react";
import "../css/DisplayScreen.css";
import {
  getComicReq,
  getImportantNotesReq,
  IImportantNote,
  IUsers,
  getLunchMenuReq,
  DailyMenuResponse,
} from "../utils";
import DisplayedUser from "../components/DisplayedUser";
import { IComicLocalStorage } from "../utils";
import { useLocalStorage } from "usehooks-ts";
import { OfficeScreenContext } from "../context/OfficeScreenContext";

const DisplayScreen = () => {
  const [users, setUsers] = useState<IUsers[] | null>(null);
  const [comicDetails, setComicDetails] = useState<IComicLocalStorage | null>(
    null
  );
  const [importantNotes, setImportantNotes] = useState<IImportantNote[] | null>(
    null
  );
  const context = useContext(OfficeScreenContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comicData, setComicData, clearComicData] =
    useLocalStorage<IComicLocalStorage | null>("ComicData", null);
  const [lunchMenu, setLunchMenu] = useState<DailyMenuResponse | null>(null);

  const getImportantNotes = async () => {
    const notesData = await getImportantNotesReq();
    setImportantNotes(notesData);
    console.log(notesData);
  };

  useEffect(() => {
    getImportantNotes();
  }, []);

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
    getMenu();
  }, []);

  useEffect(() => {
    const comicSocket = new WebSocket("https://localhost:7078/ws/comic");
    const importantNotesSocket = new WebSocket(
      "https://localhost:7078/ws/importantNotes"
    );
    const userStatusSocket = new WebSocket(
      "https://localhost:7078/ws/userStatus"
    );

    comicSocket.onopen = () => console.log("Connected to WebSocket");
    importantNotesSocket.onopen = () => console.log("Connected to WebSocket");
    userStatusSocket.onopen = () => console.log("Connected to WebSocket");

    comicSocket.onmessage = (event) => {
      console.log("New message:", event.data);
      setComicDetails(JSON.parse(event.data));
    };

    importantNotesSocket.onmessage = (event) => {
      console.log("New message:", event.data);
      setImportantNotes(JSON.parse(event.data));
    };

    userStatusSocket.onmessage = (event) => {
      console.log("New message:", event.data);
      console.log("ussssser", event.data);
      updateUsers();
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
    updateUsers();
  }, []);

  const getMenu = async () => {
    const response = await getLunchMenuReq();
    setLunchMenu(response);
  };

  const updateUsers = () => {
    context.fetchUsers().then((u) => {
      let userInfo: IUsers[] = [];
      let idCount = 0;
      u.forEach((user) => {
        console.log("For each user. Id: " + idCount);
        userInfo.push({
          id: (idCount++).toString(),
          name: user.name,
          UserStatus: user.status,
          startDate: user.statusStartTime,
          endDate: user.statusEndTime,
        });
      });
      if (userInfo.length < 1) {
        defaultUsers();
      } else {
        setUsers(userInfo);
      }
    });
  };

  const defaultUsers = () => {
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
  };

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
          {
            <>
              <h2>{lunchMenu?.day}'s Lunch menu</h2>
              <ul className="menu-list">
                {lunchMenu?.dayMenu.MenuItems.map((item, index) => (
                  <li className="menu-item" key={index}>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">{item.price}</p>
                    <ul className="item-tags">
                      {item.tags.map((tag, index2) => (
                        <li key={index2}>{tag}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
