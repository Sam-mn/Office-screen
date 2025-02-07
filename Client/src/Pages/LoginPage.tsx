import "../css/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
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
