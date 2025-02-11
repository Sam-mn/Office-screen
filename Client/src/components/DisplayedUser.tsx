import React, { useEffect, useState } from "react";
import { IUsers } from "../utils";

const DisplayedUser = ({
  id,
  name,
  UserStatus,
  endDate,
  startDate,
}: IUsers) => {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    if (UserStatus === "In office") {
      setBgColor("#4caf50");
    } else if (UserStatus === "Away") {
      setBgColor("#ffeb3b");
    } else if (UserStatus === "Busy") {
      setBgColor("#FF5722");
    }
  }, [UserStatus]);

  return (
    <div style={{ backgroundColor: bgColor }}>
      <h3>
        {name} - {UserStatus}
      </h3>
    </div>
  );
};

export default DisplayedUser;
