import { Link } from "react-router-dom";
import Logo from "../assets/cicoCropped.png";

function Header() {
  return (
    <header className="header">
      <div>
        <Link to={"/"}>
          <div className="logo">
            <img src={Logo} alt="Grey letter C" />
          </div>
        </Link>
        <div className="title">CICO Mode</div>
      </div>

      <Link to={"/bmi-calculator"}>BMI Calculator</Link>
    </header>
  );
}

export default Header;
