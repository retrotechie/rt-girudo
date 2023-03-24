import { Link, useNavigate } from "react-router-dom";
import { useContext, ChangeEvent, MouseEvent, useState } from "react";
import { isAxiosError } from "axios";

import { AuthContext } from "../../context/Auth";

import "./login.scss";

type Inputs = {
  username: string;
  password: string;
};

type ErrorResponse = {
  message: string;
};

const Login = (): JSX.Element => {
  // Define `inputs` state, which initially has empty `username` & `password`
  // properties. `setInputs` is used to keep track of `inputs` state changes.
  const [inputs, setInputs] = useState<Inputs>({
    username: "",
    password: "",
  });

  // Define `err` state, which is initially `null`, and `setErr` to keep track
  // of `err` state changes.
  const [err, setErr] = useState<ErrorResponse | null>(null);

  const navigate = useNavigate();

  // Update `inputs` state whenever user types in the `username` or `password`
  // input fields.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // The `login` func is obtained from the `AuthContext`, which is presumably
  // defined in the `Auth` context.
  const { login } = useContext(AuthContext);

  // `handleLogin` is to handle the form submission, which calls the `login`
  // function & navigates to the `Home` page if successful. If there is an error
  // it sets the `err` state the error message.
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err: unknown) {
      if (isAxiosError(err)) setErr(err.response?.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            magni omnis, optio dicta ipsam minima natus dignissimos, est numquam
            animi obcaecati facilis iste tempora ex et voluptates aliquam
            dolorum? Ratione!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <>{err && err}</>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
