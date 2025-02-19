import { FormEventHandler, useState } from "react";
import "../css/LoginPage.css";
import { login } from "../utils/requests";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const attemptLogin: FormEventHandler<HTMLFormElement> = async (form) => {
    form.preventDefault();
    try {
      const token = await login(username, password);
      navigate("/");
    } catch {
      throw new Error("Login failed.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={attemptLogin}>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            onChange={(name) => setUsername(name.target.value)}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={(pw) => setPassword(pw.target.value)}
            required
          />
          <button type="submit" className="login-button ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
