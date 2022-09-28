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
  const [bmr, setBmr] = useState("");

  const today = new Date();
  const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  console.log(weekFromToday);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aa7f620368mshcec54851d525b6fp11dff9jsn36ee04ed8231",
      "X-RapidAPI-Host": "bmr-and-tmr.p.rapidapi.com"
    }
  };

  async function getBmr() {
    try {
      const response = await fetch(
        "https://body-mass-index-bmi-calculator.p.rapidapi.com/" +
          `calculate-bmr?weight=${weight}&height=${height}&age=${age}&sex=${gender}&inImperial=${imperialModeOn}`,
        options
      );

      const bmr = await response.json();
      setBmr(bmr);

      console.log(bmr.bmr);
    } catch (error) {
      console.log(error);
    }
  }

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
    });
  });

  const tdee = bmr * 1.2;

  return (
    <tr>
      <th>weekFromToday</th>
      <td>{weight}</td>
      <td>{tdee}</td>
      <td>{tdee - calories}</td>
      <button onClick={() => getBmr()}>Check BMR</button>
    </tr>
  );
}

export default TableRow;
