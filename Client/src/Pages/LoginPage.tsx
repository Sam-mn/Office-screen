import { FormEventHandler, useContext, useState } from "react";
import "../css/LoginPage.css";
import { OfficeScreenContext } from "../context/OfficeScreenContext";
import { login } from "../utils";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const navigate = useNavigate();
  const context = useContext(OfficeScreenContext);
  const setTokens = context.setTokens;

  const attemptLogin: FormEventHandler<HTMLFormElement> = async (form) => {
    form.preventDefault();
    try {
      context.clearTokens();
      setTokens(await login(username, password));
      setLoginFailed(false);
      navigate(context.getForwardPage());
    }
    catch {
      setLoginFailed(true);
    }
  }

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
      {loginFailed && FieldMessage("Login failed")}
    </div>
  );
};

const FieldMessage = (message: string) => {
  return (
    <div className="login-field-message">
      <p>
        {message}
      </p>
    </div>
  )
} 

export default LoginPage;
