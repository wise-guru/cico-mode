import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
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

function WeightTable(props) {
  // const storeStats = () => {
  //   const storedStats = doc(db, "weight-calculator", "stats");
  //   updateDoc(storedStats, {
  //     current: [
  //       { gender: "chicken" },
  //       { female: "bologna" },
  //       { calories: "" },
  //       { age: 0 },
  //       { height: 0 },
  //       { activity: 0 }
  //     ]
  //   }).then(() => {});
  // };

  const tableInfo = (e) => {
    const storedStats = collection(db, "weight-calculator");

    getDocs(storedStats).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        console.log(document.data().current[0].age);
        return (
          <tbody>
            <tr>
              <th>${document.child}</th>
              <td>324</td>
              <td>1693</td>
              <td>500</td>
            </tr>
          </tbody>
        );
      });
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">day</th>
            <th scope="col">Weight</th>
            <th scope="col">Calories Burned</th>
            <th scope="col">Your Calorie Deficit</th>
          </tr>
        </thead>
        <tbody>
          <TableRow />
        </tbody>
      </table>
      <button
        type="button"
        onClick={(e) => {
          tableInfo(e);
          console.log("click");
        }}>
        Check
      </button>
    </div>
  );
}

export default WeightTable;
