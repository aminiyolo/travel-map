import { useState, useRef } from "react";
import { Cancel, Room } from "@material-ui/icons";
import "./register.css";
import axios from "axios";

function Register({ closeRegister }) {
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setsuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register__container">
      <div className="logo">
        <Room />
        PinMap
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button type="submit" className="register__button">
          Register
        </button>
        {success && (
          <span className="success">Successful. You can login now</span>
        )}
        {error && <span className="failure">Something went wrong !</span>}
      </form>
      <Cancel className="cancle" onClick={closeRegister} />
    </div>
  );
}

export default Register;
