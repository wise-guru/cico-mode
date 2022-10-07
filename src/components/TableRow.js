import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
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

function TableRow(props) {
  const { tableRows, weeks } = props;
  const storedTable = collection(db, "weight-table");
  const [rows, setRows] = useState([]);

  getDocs(storedTable).then((snapshot) => {
    snapshot.docs.forEach((document) => {
      const storedTableArray = document.data().current;

      setRows(storedTableArray);
    });
  });

  return (
    <div>
      <table className="weightTable">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Weight</th>
            <th scope="col">Calories Burned (TDEE)</th>
            <th scope="col">Your Calorie Deficit</th>
          </tr>
        </thead>
        <tbody>
          {rows !== [] || undefined ? (
            rows.slice(0, weeks).map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.dayRow}</td>
                  <td>{row.weightRow}</td>
                  <td>{row.caloriesBurnedRow}</td>
                  <td>{row.deficitRow}</td>
                </tr>
              );
            })
          ) : tableRows !== [] || undefined ? (
            tableRows.slice(0, weeks).map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.dayRow}</td>
                  <td>{row.weightRow}</td>
                  <td>{row.caloriesBurnedRow}</td>
                  <td>{row.deficitRow}</td>
                </tr>
              );
            })
          ) : (
            <div>404</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableRow;
