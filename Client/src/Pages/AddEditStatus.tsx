import { useState } from "react";
import "../css/StatusPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEditStatus = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  return (
    <div className="status-container">
      <h1>Status</h1>
      <form>
        <label htmlFor="uname">
          <b>Chose Status</b>
        </label>
        <select id="status" name="status">
          <option disabled selected>
            select a status
          </option>
          <option value="In office">In office</option>
          <option value="Away">Away</option>
        </select>

        <label htmlFor="psw">
          <b>Write new status</b>
        </label>
        <input type="text" placeholder="Write new status" name="psw" required />
        <div className="date-time">
          <label htmlFor="StartDate">
            <b>From</b>
          </label>
          <DatePicker
            selected={selectedStartDate}
            onChange={(date) => setSelectedStartDate(date)}
            placeholderText="Click to select a date"
            showTimeSelect
            name="StartDate"
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="custom-datepicker"
          />
          <label htmlFor="EndDate">
            <b>Till</b>
          </label>
          <DatePicker
            selected={selectedEndDate}
            onChange={(date) => setSelectedEndDate(date)}
            placeholderText="Click to select a date"
            showTimeSelect
            name="EndDate"
            timeFormat="HH:mm"
            timeIntervals={5}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="custom-datepicker"
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddEditStatus;
