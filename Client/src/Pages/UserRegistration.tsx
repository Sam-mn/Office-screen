import { useState } from "react";
import "../css/UserRegistration.css";
import { UserRegistrationData } from "../utils";

const UserRegistration = () => {
  const [userData, setUserData] = useState<UserRegistrationData>({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="userRegistration-container">
      <h1>User registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="firstName">
            <b>First name</b>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            name="firstName"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="lastName">
            <b>Last name</b>
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            name="lastName"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleOnChange}
            required
          />
          <label htmlFor="passwordConfirm">
            <b>Confirm your Password</b>
          </label>
          <input
            type="password"
            placeholder="Confirm your Password"
            name="passwordConfirm"
            onChange={handleOnChange}
            required
          />
          <button type="submit" className="RegisterUser-button ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
