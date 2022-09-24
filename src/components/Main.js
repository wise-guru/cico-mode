import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import BMICalculator from "./BMICalculator";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/bmi-calculator" element={<BMICalculator />} />
    </Routes>
  );
}

export default Main;
