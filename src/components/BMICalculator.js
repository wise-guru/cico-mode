import { useState } from "react";

function BMICalculator() {
  //   const kgModeRef = useRef(null);
  const [metricModeOn, setMetricModeOn] = useState(false);

  //   const lbsModeRef = useRef(null);
  const [imperialModeOn, setImperialModeOn] = useState(true);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa7f620368mshcec54851d525b6fp11dff9jsn36ee04ed8231",
      "X-RapidAPI-Host": "body-mass-index-bmi-calculator.p.rapidapi.com"
    }
  };

  async function getBmiKilo() {
    try {
      const getBmi = await fetch(
        "https://body-mass-index-bmi-calculator.p.rapidapi.com/" + "metric?weight=150&height=1.83",
        options
      );

      const BmiKilo = await getBmi.json();
      console.log(BmiKilo);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBmiPounds() {
    try {
      const getBmi = await fetch(
        "https://body-mass-index-bmi-calculator.p.rapidapi.com/" + "imperial?weight=150&height=60",
        options
      );

      const BmiKilo = await getBmi.json();
      console.log(BmiKilo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bmiCalc">
      <div>
        <button
          type="button"
          onClick={() => {
            setMetricModeOn(false);
            setImperialModeOn(true);
          }}>
          lbs
        </button>

        <button
          type="button"
          onClick={() => {
            setImperialModeOn(false);
            setMetricModeOn(true);
          }}>
          Kgs
        </button>
      </div>
      <form>
        <div className="row">
          <label>
            What is your weight
            {imperialModeOn ? (
              <span>(in pounds)?</span>
            ) : metricModeOn ? (
              <span>(in kilograms)?</span>
            ) : null}
          </label>
          {imperialModeOn ? (
            <input type={"number"} name={"weight"} id={"weight"} placeholder={"153"} />
          ) : metricModeOn ? (
            <input type={"number"} name={"weight"} id={"weight"} placeholder={"72"} />
          ) : (
            <div>404</div>
          )}
        </div>

        <div className="row">
          <label htmlFor="height">
            What is your height
            {imperialModeOn ? (
              <span>(in inches)?</span>
            ) : metricModeOn ? (
              <span>(in meters)?</span>
            ) : null}
          </label>

          {imperialModeOn ? (
            <input type={"number"} name={"height"} id={"height"} placeholder={"70"} />
          ) : metricModeOn ? (
            <input type={"number"} name={"height"} id={"height"} placeholder={"1.83 "} />
          ) : null}
        </div>
      </form>
      <button
        type="button"
        onClick={() => {
          if (metricModeOn) {
            // getBmiKilo();
            console.log("kilos");
          } else if (imperialModeOn) {
            // getBmiPounds();
            console.log("pounds");
          }
        }}>
        Check
      </button>
    </div>
  );
}

// const getBmi = await fetch(
//     "https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=" +
//       weightKg +
//       "&height=" +
//       heightM,
//     { mode: "cors" }
//   );

export default BMICalculator;
