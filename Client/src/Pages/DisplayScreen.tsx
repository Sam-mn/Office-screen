import { useEffect, useState } from "react";
import "../css/DisplayScreen.css";
import { IComic, IImportantNote, IUsers } from "../utils";
import DisplayedUser from "../components/DisplayedUser";

const DisplayScreen = () => {
  const [users, setUsers] = useState<IUsers[] | null>(null);
  const [comicDetails, setComicDetails] = useState<IComic | null>(null);
  const [importantNotes, setImportantNotes] = useState<IImportantNote[] | null>(
    null
  );

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

    setImportantNotes([
      {
        id: "1",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        id: "2",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        id: "3",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        id: "4",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
    ]);

    setComicDetails({
      id: 1,
      filePath: null,
      url: "https://localhost:7078/static/images/XKCD/10ff684d-223f-4491-8de6-37abe7f15b81.png",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamu quasi placeat nobis. Ducimus.",
    });
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
          <ul>
            {importantNotes?.map((note) => (
              <li key={note.id}>{note.note}</li>
            ))}
          </ul>
        </div>
        <div className="middleDiv">
          {comicDetails?.url && <img src={comicDetails.url} />}
          {comicDetails?.filePath && <img src={comicDetails.filePath} />}
          <p>{comicDetails?.text}</p>
        </div>
        <div className="MenuDiv">
          <h2>Lunch menu</h2>
        </div>
      </div>
    </div>
  );
};

export default DisplayScreen;
