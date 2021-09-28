import { useState, useRef } from "react";
import { Cancel, Room } from "@material-ui/icons";
import "./login.css";
import axios from "axios";

function Login({ closeLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      closeLogin();
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="login__container">
      <div className="logo">
        <Room />
        PinMap
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit" className="login__button">
          Login
        </button>
        {error && <span className="failure">Something went wrong !</span>}
      </form>
      <Cancel className="cancle" onClick={closeLogin} />
    </div>
  );
}

export default Login;
