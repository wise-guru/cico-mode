import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import TableRow from "./TableRow";
import WeightTable from "./WeightTable";
import "../Styles/homepage.css";
import { check } from "prettier";

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
  const {
    buttonOn,
    imperialModeOn,
    metricModeOn,
    setImperialModeOn,
    setMetricModeOn,
    setGenderInput,
    setWeightInput,
    caloriesInput,
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

  const handleUnits = (e) => {
    if (e.target.value === "imperial" && e.target.checked) {
      setMetricModeOn(false);
      setImperialModeOn(true);
    } else if (e.target.value === "metric" && e.target.checked) {
      setImperialModeOn(false);
      setMetricModeOn(true);
    }
  };
  // const { tableRows, setTableRows } = props;
  // const [metricModeOn, setMetricModeOn] = useState(false);
  // const [imperialModeOn, setImperialModeOn] = useState(true);
  // const [buttonOn, setButtonOn] = useState(false);

  // const [genderInput, setGenderInput] = useState(props?.value ?? "");
  // const [ageInput, setAgeInput] = useState(props?.value ?? 0);
  // const [weightInput, setWeightInput] = useState(props?.value ?? 0);
  // const [caloriesInput, setCaloriesInput] = useState(props?.value ?? 0);
  // const [heightInput, setHeightInput] = useState(props?.value ?? 0);
  // const [activityInput, setActivityInput] = useState(props?.value ?? "sedentary");
  // const [tdeeMultiplier, setTdeeMultiplier] = useState("");
  // // const [bmr, setBmr] = useState("");
  // const tableStats = doc(db, "weight-table", "table");
  // const storedStats = doc(db, "weight-calculator", "stats");

  // const bmr =
  //   genderInput === "female" && imperialModeOn
  //     ? 4.536 * weightInput + 15.88 * heightInput - 5 * ageInput - 161
  //     : genderInput === "female" && !imperialModeOn
  //     ? 4.536 * weightInput + 15.88 * heightInput - 5 * ageInput + 5
  //     : genderInput === "male" && imperialModeOn
  //     ? 10 * weightInput + 6.25 * heightInput - 5 * ageInput - 161
  //     : 10 * weightInput + 6.25 * heightInput - 5 * ageInput + 5;

  // const tdee = Math.round(bmr * tdeeMultiplier * 100) / 100;

  // const caloricDeficit = tdee - caloriesInput;

  // const today = new Date();
  // const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  // const date =
  //   (weekFromToday.getMonth().toString().length >= 1
  //     ? weekFromToday.getMonth() + 1
  //     : "0" + (weekFromToday.getMonth() + 1)) +
  //   "/" +
  //   (weekFromToday.getDate().toString().length >= 1
  //     ? weekFromToday.getDate()
  //     : "0" + weekFromToday.getDate()) +
  //   "/" +
  //   weekFromToday.getFullYear();

  // const personalStats = {
  //   gender: genderInput,
  //   weight: weightInput,
  //   calories: caloriesInput,
  //   age: ageInput,
  //   height: heightInput,
  //   activity: activityInput,
  //   imperialMode: imperialModeOn,
  //   tdeeMultiplier: tdeeMultiplier,
  //   tdee: tdee,
  //   bmr: bmr
  // };

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "aa7f620368mshcec54851d525b6fp11dff9jsn36ee04ed8231",
  //     "X-RapidAPI-Host": "bmr-and-tmr.p.rapidapi.com"
  //   }
  // };

  // // async function getBmr() {
  // // try {
  // //   const response = await fetch(
  // //     "https://body-mass-index-bmi-calculator.p.rapidapi.com/" +
  // //       `calculate-bmr?weight=${personalStats.weight}&height=${personalStats.height}&age=${personalStats.age}&sex=${personalStats.gender}&inImperial=${imperialModeOn}`,
  // //     options
  // //   );

  // //   const bmr = await response.json();
  // //   setBmr(bmr.bmr);

  // //   updateDoc(storedStats, {
  // //     current: [
  // //       // { gender: "chicken" },
  // //       // { female: "bologna" },
  // //       // { calories: "" },
  // //       // { age: 0 },
  // //       // { height: 0 },
  // //       // { activity: 0 }
  // //       { bmr: bmr.bmr }
  // //     ]
  // //   });

  // //   //   console.log(bmr.bmr);
  // // } catch (error) {
  // //   console.log(error);
  // // }

  // const getTdeeMultiplier = (e) => {
  //   if (e === "sedentary") {
  //     const tdee = 1.2;
  //     console.log(tdee);
  //     setTdeeMultiplier(tdee);
  //   } else if (e === "lightly") {
  //     const tdee = 1.375;
  //     setTdeeMultiplier(tdee);
  //   } else if (e === "moderately") {
  //     const tdee = 1.55;
  //     setTdeeMultiplier(tdee);
  //   } else if (e === "very") {
  //     const tdee = 1.725;
  //     setTdeeMultiplier(tdee);
  //   } else if (e === "extremely") {
  //     const tdee = 1.9;
  //     setTdeeMultiplier(tdee);
  //   }
  // };

  // const getTableRows = () => {
  //   const tableRowsArray = [
  //     {
  //       dayRow: date,
  //       weightRow: weightInput,
  //       caloriesBurnedRow: tdee,
  //       deficitRow: caloricDeficit
  //     }
  //   ];

  //   for (let i = 0; i < 10; i++) {
  //     const addedDay = (i + 1) * 7;
  //     const dateCell = new Date(
  //       weekFromToday.getFullYear(),
  //       weekFromToday.getMonth(),
  //       weekFromToday.getDate() + addedDay
  //     );

  //     const formattedDate =
  //       (dateCell.getMonth().toString().length >= 1
  //         ? dateCell.getMonth() + 1
  //         : "0" + (dateCell.getMonth() + 1)) +
  //       "/" +
  //       (dateCell.getDate().toString().length >= 1
  //         ? dateCell.getDate()
  //         : "0" + dateCell.getDate()) +
  //       "/" +
  //       dateCell.getFullYear();

  //     const weightCalories =
  //       (tableRowsArray[i].weightRow * 3500 - tableRowsArray[i].deficitRow) / 3500;

  //     const bmrCell =
  //       genderInput === "female" && imperialModeOn
  //         ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput - 161
  //         : genderInput === "female" && !imperialModeOn
  //         ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput + 5
  //         : genderInput === "male" && imperialModeOn
  //         ? 10 * weightCalories + 6.25 * heightInput - 5 * ageInput - 161
  //         : 10 * weightCalories + 6.25 * heightInput - 5 * ageInput + 5;

  //     const tdeeCell = Math.round(bmrCell * tdeeMultiplier * 100) / 100;
  //     const caloricDeficit = Math.round((tdeeCell - caloriesInput) * 100) / 100;

  //     const num = {
  //       dayRow: formattedDate,
  //       weightRow: weightCalories,
  //       caloriesBurnedRow: tdeeCell,
  //       deficitRow: caloricDeficit
  //     };

  //     tableRowsArray.push(num);
  //     setTableRows(tableRowsArray);
  //     console.log(tableRowsArray);
  //     console.log(tableRows);
  //     // return (
  //     //   <tr>
  //     //     <td>{num.dayRow}</td>
  //     //     <td>{num.weightRow}</td>
  //     //     <td>{num.caloriesBurnedRow}</td>
  //     //     <td>{num.caloricDeficit}</td>
  //     //   </tr>
  //     // );
  //   }
  // };

  // const checkForm = (e) => {
  //   if (
  //     genderInput !== "" &&
  //     weightInput > 0 &&
  //     caloriesInput > 0 &&
  //     ageInput > 0 &&
  //     heightInput > 0 &&
  //     activityInput !== ""
  //   ) {
  //     getTableRows();
  //     storeStats(e);

  //     setTimeout(() => {
  //       setButtonOn(true);
  //     }, 3000);
  //   }
  // };

  // const storeStats = (e) => {
  //   const tableRowsArray = [
  //     {
  //       dayRow: date,
  //       weightRow: weightInput,
  //       caloriesBurnedRow: tdee,
  //       deficitRow: caloricDeficit
  //     }
  //   ];

  //   for (let i = 0; i < 10; i++) {
  //     const addedDay = (i + 1) * 7;
  //     const dateCell = new Date(
  //       weekFromToday.getFullYear(),
  //       weekFromToday.getMonth(),
  //       weekFromToday.getDate() + addedDay
  //     );

  //     const formattedDate =
  //       (dateCell.getMonth().toString().length >= 1
  //         ? dateCell.getMonth() + 1
  //         : "0" + (dateCell.getMonth() + 1)) +
  //       "/" +
  //       (dateCell.getDate().toString().length >= 1
  //         ? dateCell.getDate()
  //         : "0" + dateCell.getDate()) +
  //       "/" +
  //       dateCell.getFullYear();

  //     const weightCalories =
  //       (tableRowsArray[i].weightRow * 3500 - tableRowsArray[i].deficitRow) / 3500;

  //     const bmrCell =
  //       genderInput === "female" && imperialModeOn
  //         ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput - 161
  //         : genderInput === "female" && !imperialModeOn
  //         ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput + 5
  //         : genderInput === "male" && imperialModeOn
  //         ? 10 * weightCalories + 6.25 * heightInput - 5 * ageInput - 161
  //         : 10 * weightCalories + 6.25 * heightInput - 5 * ageInput + 5;

  //     const tdeeCell = Math.round(bmrCell * tdeeMultiplier * 100) / 100;
  //     const caloricDeficit = Math.round((tdeeCell - caloriesInput) * 100) / 100;

  //     const num = {
  //       dayRow: formattedDate,
  //       weightRow: weightCalories,
  //       caloriesBurnedRow: tdeeCell,
  //       deficitRow: caloricDeficit
  //     };

  //     tableRowsArray.push(num);
  //     setTableRows(tableRowsArray);
  //     console.log(tableRowsArray);
  //     WeightTable(tableRowsArray);
  //     console.log(tableRows);

  //     updateDoc(tableStats, {
  //       current:
  //         // { gender: "chicken" },
  //         // { female: "bologna" },
  //         // { calories: "" },
  //         // { age: 0 },
  //         // { height: 0 },
  //         // { activity: 0 }
  //         tableRowsArray
  //     }).then(() => {});
  //   }

  //   updateDoc(storedStats, {
  //     current: [personalStats]
  //   }).then(() => {});
  // };

  // useEffect(() => {
  //   if (genderInput && ageInput && weightInput && caloriesInput)
  // })

  return (
    <div className="homepage bothCol">
      <h1>Weight Calculator</h1>

      {/* <div className="buttons">
        <button
          type="button"
          className="measurementBtn"
          onClick={() => {
            setMetricModeOn(false);
            setImperialModeOn(true);
          }}>
  
          Imperial
        </button>

        <button
          className="measurementBtn"
          type="button"
          onClick={() => {
            setImperialModeOn(false);
            setMetricModeOn(true);
          }}>
          Metric
        </button>
      </div> */}

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
              console.log(caloriesInput);
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
              console.log(buttonOn);
              // console.log(activityInput);
              // console.log(tdeeMultiplier);
            }}>
            <option value={"sedentary"}>Sedentary</option>
            <option value={"lightly"}>Lightly active</option>
            <option value={"moderately"}>Moderately Active</option>
            <option value={"very"}>Very Active</option>
            <option value={"extremely"}>Extremely Active</option>
          </select>
        </div>

        <div className="seventh row">
          {buttonOn ? (
            <Link to="/weight-table">
              <button
                className="submitBtn"
                type="button"
                onClick={(e) => {
                  storeStats(e);
                  // getBmr();
                  // storeStats(e);
                  // <TableRow tableRowsArray={tableRowsArray} />;
                  // console.log(ageInput);
                  // console.log(personalStats.gender);
                  // console.log(personalStats.imperialMode);
                  // console.log(personalStats.weight);
                  // WeightTable(ageInput, genderInput);
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
      </form>
    </div>
  );
}

export default Homepage;
