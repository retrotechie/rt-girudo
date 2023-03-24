import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, MouseEvent, useState } from "react";
import axios, { isAxiosError } from "axios";

type Inputs = {
  username: string;
  email: string;
  password: string;
  name: string;
};

type ErrorResponse = {
  message: string;
  // Other fields, if any
};

const Register = (): JSX.Element => {
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState<ErrorResponse | null>(null);

  // `handleChange` is called every time an input field's value changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // `setInputs` is called to update the state of the component. It takes the
    // previous state as its argument & returns a new state object that is a
    // copy of the previous state object `...prev`, but with the value of the
    // input field that triggered the change event updated to the new value
    // `[e.target.name]:e.target.value`
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  // `handleClick` is an asynchronous func & takes a `MouseEvent` as an argument
  // The `MouseEvent` is for the button click event.
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // To prevent page refresh when button is clicked

    try {
      // Send a POST request to `register` URL with the `inputs` data as the
      // request body. `axios.post` returns a promise so we use `await` to wait
      // for the response.
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err: unknown) {
      // The error object is stored in the `err` variable & `setErr` is called
      // to update the state variable `err` with the error message from the
      // server response.
      if (isAxiosError(err)) setErr(err.response?.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hi There</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            magni omnis, optio dicta ipsam minima natus dignissimos, est numquam
            animi obcaecati facilis iste tempora ex et voluptates aliquam
            dolorum? Ratione!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <>{err && err}</>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
