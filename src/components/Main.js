import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import BMICalculator from "./BMICalculator";
import WeightTable from "./WeightTable";
import { useState } from "react";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

function Main(props) {
  const [metricModeOn, setMetricModeOn] = useState(false);
  const [imperialModeOn, setImperialModeOn] = useState(true);
  const [buttonOn, setButtonOn] = useState(false);
  const [tableRows, setTableRows] = useState([]);

  const [genderInput, setGenderInput] = useState(props?.value ?? "");
  const [ageInput, setAgeInput] = useState(props?.value ?? 0);
  const [weightInput, setWeightInput] = useState(props?.value ?? 0);
  const [caloriesInput, setCaloriesInput] = useState(props?.value ?? 0);
  const [heightInput, setHeightInput] = useState(props?.value ?? 0);
  const [activityInput, setActivityInput] = useState(props?.value ?? "sedentary");
  const [tdeeMultiplier, setTdeeMultiplier] = useState(1.2);
  // const [bmr, setBmr] = useState("");
  const tableStats = doc(db, "weight-table", "table");
  const storedStats = doc(db, "weight-calculator", "stats");

  const bmr =
    genderInput === "female" && imperialModeOn
      ? 4.536 * weightInput + 15.88 * heightInput - 5 * ageInput - 161
      : genderInput === "female" && !imperialModeOn
      ? 4.536 * weightInput + 15.88 * heightInput - 5 * ageInput + 5
      : genderInput === "male" && imperialModeOn
      ? 10 * weightInput + 6.25 * heightInput - 5 * ageInput - 161
      : 10 * weightInput + 6.25 * heightInput - 5 * ageInput + 5;

  const tdee = Math.round(bmr * tdeeMultiplier * 100) / 100;

  const caloricDeficit = tdee - caloriesInput;

  const today = new Date();
  const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const date =
    (weekFromToday.getMonth().toString().length >= 1
      ? weekFromToday.getMonth() + 1
      : "0" + (weekFromToday.getMonth() + 1)) +
    "/" +
    (weekFromToday.getDate().toString().length >= 1
      ? weekFromToday.getDate()
      : "0" + weekFromToday.getDate()) +
    "/" +
    weekFromToday.getFullYear();

  const personalStats = {
    gender: genderInput,
    weight: weightInput,
    calories: caloriesInput,
    age: ageInput,
    height: heightInput,
    activity: activityInput,
    imperialMode: imperialModeOn,
    tdeeMultiplier: tdeeMultiplier,
    tdee: tdee,
    bmr: bmr
  };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa7f620368mshcec54851d525b6fp11dff9jsn36ee04ed8231",
      "X-RapidAPI-Host": "bmr-and-tmr.p.rapidapi.com"
    }
  };

  // async function getBmr() {
  // try {
  //   const response = await fetch(
  //     "https://body-mass-index-bmi-calculator.p.rapidapi.com/" +
  //       `calculate-bmr?weight=${personalStats.weight}&height=${personalStats.height}&age=${personalStats.age}&sex=${personalStats.gender}&inImperial=${imperialModeOn}`,
  //     options
  //   );

  //   const bmr = await response.json();
  //   setBmr(bmr.bmr);

  //   updateDoc(storedStats, {
  //     current: [
  //       // { gender: "chicken" },
  //       // { female: "bologna" },
  //       // { calories: "" },
  //       // { age: 0 },
  //       // { height: 0 },
  //       // { activity: 0 }
  //       { bmr: bmr.bmr }
  //     ]
  //   });

  //   //   console.log(bmr.bmr);
  // } catch (error) {
  //   console.log(error);
  // }

  const getTdeeMultiplier = (e) => {
    if (e === "sedentary") {
      const tdee = 1.2;
      console.log(tdee);
      setTdeeMultiplier(tdee);
    } else if (e === "lightly") {
      const tdee = 1.375;
      setTdeeMultiplier(tdee);
    } else if (e === "moderately") {
      const tdee = 1.55;
      setTdeeMultiplier(tdee);
    } else if (e === "very") {
      const tdee = 1.725;
      setTdeeMultiplier(tdee);
    } else if (e === "extremely") {
      const tdee = 1.9;
      setTdeeMultiplier(tdee);
    }
  };

  const getTableRows = () => {
    const tableRowsArray = [
      {
        dayRow: date,
        weightRow: weightInput,
        caloriesBurnedRow: tdee,
        deficitRow: caloricDeficit
      }
    ];

    for (let i = 0; i < 10; i++) {
      const addedDay = (i + 1) * 7;
      const dateCell = new Date(
        weekFromToday.getFullYear(),
        weekFromToday.getMonth(),
        weekFromToday.getDate() + addedDay
      );

      const formattedDate =
        (dateCell.getMonth().toString().length >= 1
          ? dateCell.getMonth() + 1
          : "0" + (dateCell.getMonth() + 1)) +
        "/" +
        (dateCell.getDate().toString().length >= 1
          ? dateCell.getDate()
          : "0" + dateCell.getDate()) +
        "/" +
        dateCell.getFullYear();

      const weightCalories =
        Math.round(tableRowsArray[i].weightRow * 3500 - tableRowsArray[i].deficitRow) / 3500;

      const bmrCell =
        genderInput === "female" && imperialModeOn
          ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput - 161
          : genderInput === "female" && !imperialModeOn
          ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput + 5
          : genderInput === "male" && imperialModeOn
          ? 10 * weightCalories + 6.25 * heightInput - 5 * ageInput - 161
          : 10 * weightCalories + 6.25 * heightInput - 5 * ageInput + 5;

      const tdeeCell = Math.round(bmrCell * tdeeMultiplier * 100) / 100;
      const caloricDeficit = Math.round((tdeeCell - caloriesInput) * 100) / 100;

      const num = {
        dayRow: formattedDate,
        weightRow: Math.round(weightCalories * 100) / 100,
        caloriesBurnedRow: tdeeCell,
        deficitRow: caloricDeficit
      };

      tableRowsArray.push(num);
      setTableRows(tableRowsArray);
      // console.log(tableRowsArray);
      // console.log(tableRows);
      // return (
      //   <tr>
      //     <td>{num.dayRow}</td>
      //     <td>{num.weightRow}</td>
      //     <td>{num.caloriesBurnedRow}</td>
      //     <td>{num.caloricDeficit}</td>
      //   </tr>
      // );
    }
  };

  const checkForm = (e) => {
    if (
      genderInput !== "" &&
      weightInput > 0 &&
      caloriesInput > 0 &&
      ageInput > 0 &&
      heightInput > 0 &&
      activityInput !== ""
    ) {
      console.log("form checked");
      // storeStats(e);

      setButtonOn(true);
    }
  };

  const storeStats = (e) => {
    const tableRowsArray = [
      {
        dayRow: date,
        weightRow: weightInput,
        caloriesBurnedRow: tdee,
        deficitRow: Math.round(caloricDeficit * 100) / 100
      }
    ];

    for (let i = 0; i < 53; i++) {
      const addedDay = (i + 1) * 7;
      const dateCell = new Date(
        weekFromToday.getFullYear(),
        weekFromToday.getMonth(),
        weekFromToday.getDate() + addedDay
      );

      const formattedDate =
        (dateCell.getMonth().toString().length >= 1
          ? dateCell.getMonth() + 1
          : "0" + (dateCell.getMonth() + 1)) +
        "/" +
        (dateCell.getDate().toString().length >= 1
          ? dateCell.getDate()
          : "0" + dateCell.getDate()) +
        "/" +
        dateCell.getFullYear();

      const weightCalories =
        (tableRowsArray[i].weightRow * 3500 - tableRowsArray[i].deficitRow) / 3500;

      const bmrCell =
        genderInput === "female" && imperialModeOn
          ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput - 161
          : genderInput === "female" && !imperialModeOn
          ? 4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput + 5
          : genderInput === "male" && imperialModeOn
          ? 10 * weightCalories + 6.25 * heightInput - 5 * ageInput - 161
          : 10 * weightCalories + 6.25 * heightInput - 5 * ageInput + 5;

      // if(genderInput === "female" && imperialModeOn) {
      //   4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput - 161
      // } else if genderInput === "female" && metricModeOn {
      //   4.536 * weightCalories + 15.88 * heightInput - 5 * ageInput + 5
      // }

      const tdeeCell = Math.round(bmrCell * tdeeMultiplier * 100) / 100;
      const caloricDeficit = Math.round((tdeeCell - caloriesInput) * 100) / 100;

      const num = {
        dayRow: formattedDate,
        weightRow: Math.round(weightCalories * 100) / 100,
        caloriesBurnedRow: tdeeCell,
        deficitRow: Math.round(caloricDeficit * 100) / 100
      };

      tableRowsArray.push(num);
      setTableRows(tableRowsArray);
      // console.log(tableRowsArray);
      // WeightTable(tableRowsArray);
      // console.log(tableRows);

      updateDoc(tableStats, {
        current:
          // { gender: "chicken" },
          // { female: "bologna" },
          // { calories: "" },
          // { age: 0 },
          // { height: 0 },
          // { activity: 0 }
          tableRowsArray
      }).then(() => {});
    }

    updateDoc(storedStats, {
      current: [personalStats]
    }).then(() => {});
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            metricModeOn={metricModeOn}
            imperialModeOn={imperialModeOn}
            setImperialModeOn={setImperialModeOn}
            setMetricModeOn={setMetricModeOn}
            tableRows={tableRows}
            setTableRows={setTableRows}
            setGenderInput={setGenderInput}
            setWeightInput={setWeightInput}
            setAgeInput={setAgeInput}
            setHeightInput={setHeightInput}
            setActivityInput={setActivityInput}
            caloriesInput={caloriesInput}
            setCaloriesInput={setCaloriesInput}
            getTdeeMultiplier={getTdeeMultiplier}
            getTableRows={getTableRows}
            checkForm={checkForm}
            storeStats={storeStats}
            buttonOn={buttonOn}
          />
        }
      />
      <Route path="/bmi-calculator" element={<BMICalculator />} />
      <Route path="/weight-table" element={<WeightTable tableRows={tableRows} today={today} />} />
    </Routes>
  );
}

export default Main;
