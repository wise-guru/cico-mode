import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Homepage(props) {
  const {
    buttonOn,
    imperialModeOn,
    metricModeOn,
    setImperialModeOn,
    setMetricModeOn,
    setGenderInput,
    setWeightInput,
    setCaloriesInput,
    setAgeInput,
    setHeightInput,
    getTdeeMultiplier,
    setActivityInput,
    checkForm,
    storeStats
  } = props;

  const [selected, setSelected] = useState("imperial");
  const imperialBtn = useRef(null);
  const metricBtn = useRef(null);

  return (
    <div className="homepage bothCol">
      <h1>Weight Predictor Calculator</h1>

      <div className="unitBtns">
        <input
          ref={imperialBtn}
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
          ref={metricBtn}
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
        <div className="first">
          <input
            className="genderInput"
            type={"radio"}
            name={"gender"}
            value={"male"}
            id={"male"}
            onChange={(e) => {
              setGenderInput(e.target.value);
              checkForm(e);
            }}
          />
          <label className="genderLabel secondCol" htmlFor={"male"}>
            Male
          </label>

          <input
            className="genderInput"
            type={"radio"}
            name={"gender"}
            value={"female"}
            id={"female"}
            onChange={(e) => {
              setGenderInput(e.target.value);
              checkForm(e);
            }}
          />
          <label className="genderLabel secondCol" htmlFor={"female"}>
            Female
          </label>
        </div>

        <div className="second row">
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
              type={"number"}
              className="secondCol"
              name={"weight"}
              id={"weight"}
              placeholder={"153"}
              onChange={(e) => {
                setWeightInput(e.target.value);
                checkForm(e);
              }}
            />
          ) : metricModeOn ? (
            <input
              type={"number"}
              className="secondCol"
              name={"weight"}
              id={"weight"}
              placeholder={"72"}
              onChange={(e) => {
                setWeightInput(e.target.value);
                checkForm(e);
              }}
            />
          ) : (
            <div>404</div>
          )}
        </div>

        <div className="third row">
          <label className="firstCol" htmlFor="calories">
            How many calories do you plan to eat in a day?
          </label>
          <input
            type={"number"}
            className="secondCol"
            name={"calories"}
            id={"calories"}
            onChange={(e) => {
              setCaloriesInput(e.target.value);
              checkForm(e);
            }}
          />
        </div>

        <div className="fourth row">
          <label className="firstCol" htmlFor="age">
            What is your age?
          </label>
          <input
            type={"number"}
            className="secondCol"
            name={"age"}
            id={"age"}
            onChange={(e) => {
              setAgeInput(e.target.value);
              checkForm(e);
            }}
          />
        </div>

        <div className="fifth row">
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
              type={"number"}
              className="secondCol"
              name={"height"}
              id={"height"}
              placeholder={"70"}
              onChange={(e) => {
                setHeightInput(e.target.value);
                checkForm(e);
              }}
            />
          ) : metricModeOn ? (
            <input
              type={"number"}
              className="secondCol"
              name={"height"}
              id={"height"}
              placeholder={"183"}
              onChange={(e) => {
                setHeightInput(e.target.value);
                checkForm(e);
              }}
            />
          ) : null}
        </div>

        <div className="sixth row">
          <label className="firstCol">How active are you?</label>
          <select
            name="activity"
            className="secondCol"
            id="activity"
            onChange={(e) => {
              setActivityInput(e.target.value);
              getTdeeMultiplier(e.target.value);
              checkForm(e);
            }}>
            <option value={"sedentary"}>Sedentary</option>
            <option value={"lightly"}>Lightly active</option>
            <option value={"moderately"}>Moderately Active</option>
            <option value={"very"}>Very Active</option>
            <option value={"extremely"}>Extremely Active</option>
          </select>
        </div>
      </form>
      <div className="seventh row">
        {buttonOn ? (
          <Link to="/weight-table">
            <button
              className="submitBtn"
              type="button"
              onClick={(e) => {
                storeStats(e);
              }}>
              Submit
            </button>
          </Link>
        ) : (
          <div>
            <button className="submitBtn" type="button" disabled={true}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
