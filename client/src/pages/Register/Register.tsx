import "./register.scss";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const Register = (): JSX.Element => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  // `handleChange` is called every time an input field's value changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // `setInputs` is called to update the state of the component. It takes the
    // previous state as its argument & returns a new state object that is a
    // copy of the previous state object `...prev`, but with the value of the
    // input field that triggered the change event updated to the new value
    // `[e.target.name]:e.target.value`
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

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
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
