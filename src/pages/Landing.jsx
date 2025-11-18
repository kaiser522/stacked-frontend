import Footer from "../components/Footer";
import Header from "../components/Header";
import AddOnModules from "../components/landingPage/AddOnModules";
import GetStacked from "../components/landingPage/GetStacked";
import LandingPageFour from "../components/landingPage/LandingPageFour";
import LandingPageThree from "../components/landingPage/LandingPageThree";
import LandingPagetwo from "../components/landingPage/LandingPagetwo";
import LandingPageOne from "../components/landingPage/LangePageOne";
import PricingPlan from "../components/landingPage/PricingPlan";
import StackedAffiliate from "../components/landingPage/StackedAffiliate";
import IntercomChat from "../components/IntercomChat";

function Landing() {
  return (
    <div style={{ backgroundColor: "#1E2A38" }} className="min-h-screen">
      <Header />
      <LandingPageOne />
      <LandingPagetwo />
      <LandingPageThree />
      <LandingPageFour />
      <PricingPlan />
      <AddOnModules />
      <StackedAffiliate/>
      <GetStacked/>
      <Footer/>
      <IntercomChat enableFin={true} />
    </div>
  );
}

export default Landing;
