import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import TableRow from "./TableRow";

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

const today = new Date();
const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

function WeightTable(props) {
  const [weeks, setWeeks] = useState(props.value ?? 52);
  const tableInfo = (e) => {
    const storedStats = collection(db, "weight-calculator");

    getDocs(storedStats).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        console.log(document.data().current[0].age);
      });
    });
  };

  return (
    <div className="weightTablePage">
      <select
        className="select"
        onChange={(e) => {
          setWeeks(e.target.value);
        }}>
        <option value={4}>4 weeks</option>
        <option value={13}>3 months</option>
        <option value={26}>6 months</option>
        <option selected value={52}>
          1 year
        </option>
      </select>
      <TableRow weeks={weeks} />
    </div>
  );
}

export default WeightTable;
