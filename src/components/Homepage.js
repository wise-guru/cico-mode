import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import TableRow from "./TableRow";
import WeightTable from "./WeightTable";

const firebaseConfig = {
  apiKey: "AIzaSyABOssmOXbt97PKwC1zEnnoZbfNgWW0Flo",
  authDomain: "cico-mode.firebaseapp.com",
  projectId: "cico-mode",
  storageBucket: "cico-mode.appspot.com",
  messagingSenderId: "451982890662",
  appId: "1:451982890662:web:80c4bd861c8d1fc51e8667",
  measurementId: "G-XFBGESJF16"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Homepage(props) {
  const [metricModeOn, setMetricModeOn] = useState(false);
  const [imperialModeOn, setImperialModeOn] = useState(true);

  const [genderInput, setGenderInput] = useState(props?.value ?? "");
  const [ageInput, setAgeInput] = useState(props?.value ?? 0);
  const [weightInput, setWeightInput] = useState(props?.value ?? 0);
  const [caloriesInput, setCaloriesInput] = useState(props?.value ?? 0);
  const [heightInput, setHeightInput] = useState(props?.value ?? 0);
  const [activityInput, setActivityInput] = useState(props?.value ?? "");

  const personalStats = {
    gender: genderInput,
    weight: weightInput,
    calories: caloriesInput,
    age: ageInput,
    height: heightInput,
    activity: activityInput,
    imperialMode: imperialModeOn
  };

  const storeStats = (e) => {
    const storedStats = doc(db, "weight-calculator", "stats");
    updateDoc(storedStats, {
      current: [
        // { gender: "chicken" },
        // { female: "bologna" },
        // { calories: "" },
        // { age: 0 },
        // { height: 0 },
        // { activity: 0 }
        personalStats
      ]
    }).then(() => {});
  };

  return (
    <div>
      <h1>Weight Calculator</h1>

      <div>
        <button
          type="button"
          onClick={() => {
            setMetricModeOn(false);
            setImperialModeOn(true);
          }}>
          Imperial
        </button>

        <button
          type="button"
          onClick={() => {
            setImperialModeOn(false);
            setMetricModeOn(true);
          }}>
          Metric
        </button>
      </div>

      <form>
        <input
          type={"radio"}
          name={"gender"}
          value={"male"}
          id={"male"}
          onChange={(e) => {
            setGenderInput(e.target.value);
          }}
        />
        <label htmlFor={"male"}>Male</label>

        <input
          type={"radio"}
          name={"gender"}
          value={"female"}
          id={"female"}
          onChange={(e) => {
            setGenderInput(e.target.value);
          }}
        />
        <label htmlFor={"female"}>Female</label>

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
            <input
              type={"number"}
              name={"weight"}
              id={"weight"}
              placeholder={"153"}
              onChange={(e) => {
                setWeightInput(e.target.value);
              }}
            />
          ) : metricModeOn ? (
            <input
              type={"number"}
              name={"weight"}
              id={"weight"}
              placeholder={"72"}
              onChange={(e) => {
                setWeightInput(e.target.value);
              }}
            />
          ) : (
            <div>404</div>
          )}
        </div>

        <div className="row">
          <label htmlFor="calories">How many calories do you plan to eat in a day?</label>
          <input
            type={"number"}
            name={"calories"}
            id={"calories"}
            onChange={(e) => {
              setCaloriesInput(e.target.value);
            }}
          />
        </div>

        <div className="row">
          <label htmlFor="age">What is your age?</label>
          <input
            type={"number"}
            name={"age"}
            id={"age"}
            onChange={(e) => {
              setAgeInput(e.target.value);
            }}
          />
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
            <input
              type={"number"}
              name={"height"}
              id={"height"}
              placeholder={"70"}
              onChange={(e) => {
                setHeightInput(e.target.value);
              }}
            />
          ) : metricModeOn ? (
            <input
              type={"number"}
              name={"height"}
              id={"height"}
              placeholder={"1.83 "}
              onChange={(e) => {
                setHeightInput(e.target.value);
              }}
            />
          ) : null}
        </div>

        <div className="row">
          <label>How active are you?</label>
          <select
            name="activity"
            id="activity"
            onChange={(e) => {
              setActivityInput(e.target.value);
            }}>
            <option value={"sedentary"}>Sedentary</option>
            <option value={"lightly"}>Lightly active</option>
            <option value={"moderately"}>Moderately Active</option>
            <option value={"very"}>Very Active</option>
            <option value={"extremely"}>Extremely Active</option>
          </select>
        </div>

        <div>
          <Link to="/weight-table">
            <button
              type="button"
              onClick={(e) => {
                storeStats(e);
                // console.log(ageInput);
                // console.log(personalStats.gender);
                console.log(personalStats.imperialMode);
                console.log(personalStats.weight);
                WeightTable(ageInput, genderInput);
              }}>
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Homepage;
