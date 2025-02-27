import { ChangeEventHandler, FormEventHandler, useContext, useEffect, useState } from "react";
import "../css/StatusPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OfficeScreenContext } from "../context/OfficeScreenContext";
import { IStatusUpdate } from "../utils";

const AddEditStatus = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [defaultStatuses, setDefaultStatuses] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [selectMessage, setSelectMessage] = useState<string>("");
  const [validSubmit, setValidSubmit] = useState<boolean>(false);
  const context = useContext(OfficeScreenContext);

  useEffect(() => {
    if (defaultStatuses.length < 1)
    {
      context.fetchDefaultStatuses().then((s) => {
        setDefaultStatuses(s)
      })
    }
  }, []);

  useEffect(() => {
    if (statusMessage !== "" || selectMessage !== "") {
      setValidSubmit(true);
    }
    else {
      setValidSubmit(false);
    }
  }, [statusMessage, selectMessage]);

  const updateStatusText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatusMessage(e.target.value);
  }

  const updateStatusSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectMessage(e.target.value);
  }

  const submitStatus: FormEventHandler<HTMLFormElement> = async (form) => {
      form.preventDefault();
      let message = statusMessage;
      if (message === "") {
        message = selectMessage;
      }
      let startTime = selectedStartDate?.toDateString();
      if (startTime === undefined) {
        startTime = "";
      }
      let endTime = selectedEndDate?.toDateString();
      if (endTime === undefined) {
        endTime = "";
      }
      const s: IStatusUpdate = {
        status: message,
        startTime: startTime,
        endTime: endTime
      }
      console.log("New status: " + message + " New start time: " + startTime + " New end time: " + endTime)
    };

  return (
    <div className="status-container">
      <h1>Status</h1>
      <form onSubmit={submitStatus}>
        <label htmlFor="uname">
          <b>Select a status</b>
        </label>
        <select id="status" name="status" defaultValue={"Select a status"} onChange={updateStatusSelect}>
          <option disabled>
            Select a status
          </option>
          {defaultStatuses.map(st => {
            return <option key={st} value={st}>{st}</option>
          })}
        </select>

        <label htmlFor="psw">
          <b>Write new status</b>
        </label>
        <input type="text" placeholder="Write new status" name="psw" value={statusMessage} onChange={updateStatusText}/>
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
        <button type="submit" disabled={!validSubmit}>Add</button>
      </form>
    </div>
  );
};

export default AddEditStatus;
