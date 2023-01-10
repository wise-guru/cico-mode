import { useState } from "react";

function BMICalculator() {
  const [selected, setSelected] = useState("imperial");
  const [metricModeOn, setMetricModeOn] = useState(false);
  const [imperialModeOn, setImperialModeOn] = useState(true);
  const [showBmiInfo, setShowBmiInfo] = useState(true);
  const [bmi, setBmi] = useState("");

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
      const bmi = Math.round(BmiKilo.bmi * 100) / 100;
      setBmi(bmi);
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

      const BmiPounds = await getBmi.json();
      const bmi = Math.round(BmiPounds.bmi * 100) / 100;
      setBmi(bmi);
      console.log(BmiPounds);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bmiCalc">
      <h1>BMI Calculator</h1>
      <div className="unitBtns">
        <input
          className="unitBtn"
          type={"radio"}
          name={"unit"}
          value={"imperial"}
          id={"imperial"}
          checked={selected === "imperial"}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(e.target.value);
              setMetricModeOn(false);
              setImperialModeOn(true);
            }
          }}
        />
        <label className="unitLabel" htmlFor={"imperial"}>
          Imperial
        </label>

        <input
          className="unitBtn"
          type={"radio"}
          name={"unit"}
          value={"metric"}
          id={"metric"}
          checked={selected === "metric"}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(e.target.value);
              setImperialModeOn(false);
              setMetricModeOn(true);
            }
          }}
        />
        <label className="unitLabel" htmlFor={"metric"}>
          Metric
        </label>
      </div>
      <form>
        <div className="first row">
          <label className="firstCol">
            What is your weight
            {imperialModeOn ? (
              <span>(in pounds)?</span>
            ) : metricModeOn ? (
              <span>(in kilograms)?</span>
            ) : null}
          </label>
          {imperialModeOn ? (
            <input
              min={0}
              className="secondCol"
              type={"number"}
              name={"weight"}
              id={"weight"}
              placeholder={"153"}
              onKeyDown={(e) => {
                if (e.key == "-") {
                  e.preventDefault();
                }
              }}
            />
          ) : metricModeOn ? (
            <input
              min={0}
              className="secondCol"
              type={"number"}
              name={"weight"}
              id={"weight"}
              placeholder={"72"}
              onKeyDown={(e) => {
                if (e.key == "-") {
                  e.preventDefault();
                }
              }}
            />
          ) : (
            <div>404</div>
          )}
        </div>

        <div className=" second row">
          <label className="firstCol" htmlFor="height">
            What is your height
            {imperialModeOn ? (
              <span>(in inches)?</span>
            ) : metricModeOn ? (
              <span>(in centimeters)?</span>
            ) : null}
          </label>

          {imperialModeOn ? (
            <input
              min={0}
              className="secondCol"
              type={"number"}
              name={"height"}
              id={"height"}
              placeholder={"70"}
              onKeyDown={(e) => {
                if (e.key == "-") {
                  e.preventDefault();
                }
              }}
            />
          ) : metricModeOn ? (
            <input
              min={0}
              className="secondCol"
              type={"number"}
              name={"height"}
              id={"height"}
              placeholder={"183"}
              onKeyDown={(e) => {
                if (e.key == "-") {
                  e.preventDefault();
                }
              }}
            />
          ) : null}
        </div>
      </form>
      <div className="">
        <button
          className="submitBtn"
          type="button"
          onClick={() => {
            if (metricModeOn) {
              getBmiKilo();
              setShowBmiInfo(true);
              // console.log("kilos");
            } else if (imperialModeOn) {
              getBmiPounds();
              // console.log("pounds");
            }
          }}>
          Check
        </button>
      </div>
      {showBmiInfo ? (
        <div className="bmiInfo">
          <p>
            <strong>Your BMI is: {bmi}</strong>
          </p>
          <div className="bmiCategories">
            <p>BMI Categories:</p>
            <p>Underweight = &lt;18.5</p>
            <p>Normal weight = 18.5-24.9</p>
            <p>Overweight = 25-29.9</p>
            <p>Obesity = BMI of 30 or greater</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BMICalculator;
