import "./register.scss";
import { Link } from "react-router-dom";

const Register = (): JSX.Element => {
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
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
