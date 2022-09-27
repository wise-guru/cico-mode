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

  const today = new Date();
  const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  console.log(weekFromToday);

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
    });
  });

  const bmr = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;

  const tdee = bmr;

  return (
    <tr>
      <th>weekFromToday</th>
      <td>{weight}</td>
      <td>{tdee}</td>
      <td>{tdee - calories}</td>
    </tr>
  );
}

export default TableRow;
