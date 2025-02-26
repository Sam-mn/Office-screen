/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "../css/UserRegistration.css";
import { addNewUser, UserRegistrationData } from "../utils";

const UserRegistration = () => {
  const [userData, setUserData] = useState<UserRegistrationData>({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    admin: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleConfirmPasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userData.password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await addNewUser(userData);

      console.log(response.data);

      if (response.data.status === 201) {
        setUserCreated(true);
        setErrorMessage("");
        setError(false);
      } else {
        setUserCreated(false);
      }
    } catch (error: any) {
      setUserCreated(false);

      setErrorMessage(`Error adding user: ${error.response.data[0].code}`);
      setError(true);
      throw error;
    }
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
            onChange={handleConfirmPasswordOnChange}
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="admin"
              checked={userData.admin}
              onChange={handleOnChange}
            />
            <label htmlFor="admin">
              <b>Admin</b>
            </label>
          </div>
          <button type="submit" className="RegisterUser-button ">
            Register
          </button>
          {userCreated && (
            <p className="succesMessage">user created successfully</p>
          )}
          {error && <p className="errorMessage">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
