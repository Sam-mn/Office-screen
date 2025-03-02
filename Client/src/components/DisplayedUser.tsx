import { useEffect, useState } from "react";
import { IUsers } from "../utils";

const DisplayedUser = ({
  // id,
  name,
  UserStatus,
  //  endDate,
  //  startDate,
}: IUsers) => {
  const [bgColor, setBgColor] = useState<string>("");
  const [statusText, setStatusText] = useState<string>("");
  const [timeText, setTimeText] = useState<string>("");

  useEffect(() => {
    setStatusText(name + " - " + UserStatus);
    if (UserStatus === "Available") {
      setBgColor("#4caf50");
    } else if (UserStatus === "Not here") {
      setBgColor("#ffeb3b");
    } else if (UserStatus === "Do not disturb") {
      setBgColor("#FF5722");
    } else if (UserStatus === "Away") {
      setBgColor("#5d9eff");
    } else if (UserStatus === "" || UserStatus === undefined || UserStatus === null) {
      setStatusText(name);
    }
    console.log("Startdate " + startDate)
    console.log("Enddate " + endDate)

    let newTimeText: string = "";
    if (startDate !== "" && startDate !== undefined && startDate !== null) {
      newTimeText = "From: " + startDate;
    }
    if (endDate !== "" && endDate !== undefined && endDate !== null) {
      if (newTimeText !== "") {
        newTimeText += "   ...   "
      }
      newTimeText += "To: " + endDate;
    }
    setTimeText(newTimeText);
  }, [UserStatus]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <h3>
        {statusText}
      </h3>
      <p>
        {timeText}
      </p>
    </div>
  );
};

export default DisplayedUser;
