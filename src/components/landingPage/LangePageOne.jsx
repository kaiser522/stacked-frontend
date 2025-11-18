import Button from "../Button";
import logo from "../../assets/logo/logo-1.png";
import { Link } from "react-router-dom";

function LandingPageOne() {
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 pt-15">
        <img
          className="transition-all w-[300px] cursor-pointer duration-300 hover:brightness-125 hover:drop-shadow-[0_0_15px_#ffffff]"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="p-4 text-6xl text-white">
        <h2>Close Smarter. Move Faster.</h2>
        <h2 className="text-center">Stay Stacked.</h2>
      </div>
      <div className="p-4 text-xl text-white">
        <p>
          One platform to track leads, analyze deals and scale your real estate
          business — your way.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Link to='/login'>
          <Button variant="primary">GET STARTED</Button>
        </Link>

        <Link to="/pricing">
          <Button variant="outline">VIEW PRICING</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPageOne;
