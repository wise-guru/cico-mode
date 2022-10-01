import { tab } from "@testing-library/user-event/dist/tab";
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

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

function TableRow() {
  const storedStats = collection(db, "weight-calculator");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [calories, setCalories] = useState("");
  const [activity, setActivity] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [imperialModeOn, setImperialModeOn] = useState(true);
  const [tdeeMultiplier, setTdeeMultiplier] = useState("");
  const [bmr, setBmr] = useState("");
  const [tableBmr, setTableBmr] = useState(0);

  const today = new Date();
  const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  console.log(weekFromToday);

  const twoWeeksFromToday = new Date(
    weekFromToday.getFullYear(),
    weekFromToday.getMonth(),
    weekFromToday.getDate() + 7
  );
  console.log(`Two weeks: ${twoWeeksFromToday}`);

  const monthFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60);
  console.log(`Month from today: ${monthFromToday}`);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa7f620368mshcec54851d525b6fp11dff9jsn36ee04ed8231",
      "X-RapidAPI-Host": "bmr-and-tmr.p.rapidapi.com"
    }
  };

  getDocs(storedStats).then((snapshot) => {
    snapshot.docs.forEach((document) => {
      const personalStats = document.data().current[0];
      console.log(personalStats.age);

      setGender(personalStats.gender);
      setWeight(personalStats.weight);
      setAge(personalStats.age);
      setCalories(personalStats.calories);
      setHeight(personalStats.height);
      setActivity(personalStats.activity);
      setImperialModeOn(personalStats.imperialMode);
      setTdeeMultiplier(personalStats.tdeeMultiplier);
    });

    if (imperialModeOn) {
      const bmr =
        gender === "female"
          ? 4.536 * weight + 15.88 * height - 5 * age - 161
          : 4.536 * weight + 15.88 * height - 5 * age + 5;
      setBmr(bmr);
      console.log(`${bmr} imperial`);
    } else {
      const bmr =
        gender === "female"
          ? 10 * weight + 6.25 * height - 5 * age - 161
          : 10 * weight + 6.25 * height - 5 * age + 5;
      setBmr(bmr);
      console.log(`${bmr} metric`);
    }
  });

  const result = weekFromToday;
  const date =
    (result.getMonth().toString().length >= 1
      ? result.getMonth() + 1
      : "0" + (result.getMonth() + 1)) +
    "/" +
    (result.getDate().toString().length >= 1 ? result.getDate() : "0" + result.getDate()) +
    "/" +
    result.getFullYear();
  //   console.log(date);
  //   console.log(tdee);
  //   console.log(activity);

  const tdee = Math.round(bmr * tdeeMultiplier * 100) / 100;
  const caloricDeficit = Math.round((tdee - calories) * 100) / 100;

  const getTableRows = () => {
    const tableRows = [
      {
        dayRow: date,
        weightRow: weight,
        caloriesBurnedRow: calories,
        deficitRow: caloricDeficit
      }
    ];

    for (let i = 0; i < 10; i++) {
      const addedDay = (i + 1) * 7;
      const date = new Date(
        weekFromToday.getFullYear(),
        weekFromToday.getMonth(),
        weekFromToday.getDate() + addedDay
      );

      const formattedDate =
        (date.getMonth().toString().length >= 1
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate().toString().length >= 1 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear();

      const weightCalories = (tableRows[i].weightRow * 3500 - tableRows[i].deficitRow) / 3500;

      if (imperialModeOn) {
        const bmr =
          gender === "female"
            ? 4.536 * weightCalories + 15.88 * height - 5 * age - 161
            : 4.536 * weightCalories + 15.88 * height - 5 * age + 5;
        setTableBmr(bmr);
        console.log(`${tableBmr} imperial`);
      } else {
        const bmr =
          gender === "female"
            ? 10 * weightCalories + 6.25 * height - 5 * age - 161
            : 10 * weightCalories + 6.25 * height - 5 * age + 5;
        setTableBmr(bmr);
        console.log(`${tableBmr} metric`);
      }
      const tdee = Math.round(tableBmr * tdeeMultiplier * 100) / 100;
      const caloricDeficit = Math.round((tdee - calories) * 100) / 100;

      const num = {
        dayRow: formattedDate,
        weightRow: weightCalories,
        caloriesBurnedRow: tdee,
        deficitRow: caloricDeficit
      };

      tableRows.push(num);
    }
    console.log(tableRows);
  };

  console.log(tdee);
  console.log(tdeeMultiplier);

  return (
    <tr>
      <th className="date">{date}</th>
      <td className="weight">{weight}</td>
      <td className="tdee">{tdee}</td>
      <td className="deficit">{caloricDeficit}</td>
      <a onClick={() => getTableRows()}>Table Rows</a>
    </tr>
  );
}

export default TableRow;
