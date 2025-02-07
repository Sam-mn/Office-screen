import "../css/DisplayScreen.css";

const DisplayScreen = () => {
  return (
    <div>
      <div className="users-container">
        <div style={{ backgroundColor: "#4caf50" }}>
          <h3>Ammar - In office</h3>
        </div>
        <div style={{ backgroundColor: "#ffeb3b" }}>
          <h3>Daniel - Away</h3>
        </div>
        <div style={{ backgroundColor: "#FF5722" }}>
          <h3>Samer - Busy</h3>
        </div>
      </div>
      <div className="info-container">
        <div> important note</div>
        <div className="middleDiv">
          <img src="https://imgs.xkcd.com/comics/stromatolites.png" />
        </div>
        <div>Lunch menu</div>
      </div>
    </div>
  );
};

export default DisplayScreen;
