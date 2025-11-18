import Button from "./Button";
import logo from "../assets/logo/logo-1.png";
import { Link, useNavigate } from "react-router-dom";

function Header({ buttonText = "SIGN IN", navigateTo = "/login" }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (typeof navigateTo === "function") {
      navigateTo(); // invoke the function (e.g., () => navigate(-1))
    } else {
      navigate(navigateTo); // navigate to a string path (e.g., "/login")
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[200px] p-4 cursor-pointer transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_15px_#ffffff]"
          />
        </Link>
      </div>

      <div className="p-10">
        <Button variant="primary" className="max-sm:w-27" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default Header;
