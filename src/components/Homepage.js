import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

function Homepage(props) {
  const [kgModeOn, setKgModeOn] = useState(false);
  const [lbsModeOn, setLbsModeOn] = useState(true);
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
    activity: activityInput
  };

  // const gender = weightRef.value;
  // console.log(gender)

  const setWeightMode = (e) => {
    if (e === "lbs") {
      setKgModeOn(false);
      setLbsModeOn(true);
      console.log("pounds");
    } else if (e === "kgs") {
      setLbsModeOn(false);
      setKgModeOn(true);
      console.log("kilos");
    }
  };

  const setHeightMode = (e) => {
    if (e === "inches") {
      setKgModeOn(false);
      setLbsModeOn(true);
      console.log("inches");
    } else if (e === "meters") {
      setLbsModeOn(false);
      setKgModeOn(true);
      console.log("meters");
    }
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

  // const tableInfo = (e) => {
  //   const storedStats = collection(db, "weight-calculator");

  //   getDocs(storedStats).then((snapshot) => {
  //     snapshot.docs.forEach((document) => {
  //       console.log(document.stats.age);
  //       return <TableRow />;
  //     });
  //   });
  // };

  return (
    <div>
      <h1>Weight Calculator</h1>
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
          <label>What is your weight?</label>
          <input
            type={"text"}
            name={"weight"}
            id={"weight"}
            onChange={(e) => {
              setWeightInput(e.target.value);
            }}
          />

          <label htmlFor="weightUnits">Units:</label>
          <select
            name="units"
            id="weightUnits"
            onChange={(e) => {
              setWeightMode(e.target.value);
            }}>
            <option value={"lbs"}>lbs</option>
            <option value={"kgs"}>kgs</option>
          </select>
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
          <label htmlFor="height">What is your height?</label>
          <input
            type={"number"}
            name={"height"}
            id={"height"}
            placeholder={"5'0"}
            onChange={(e) => {
              setHeightInput(e.target.value);
            }}
          />

          <label htmlFor="heightUnits">Units:</label>
          <select
            name="units"
            id="heightUnits"
            onChange={(e) => {
              setHeightMode(e.target.value);
            }}>
            <option value={"inches"}>inches</option>
            <option value={"meters"}>meters</option>
          </select>
        </div>

        <div>
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
          </select>
        </div>
        <div>
          {/* <Link to="/weight-table"> */}
          <button
            type="button"
            onClick={(e) => {
              storeStats(e);
              console.log(ageInput);
              console.log(personalStats.gender);
              console.log(activityInput);
            }}>
            Submit
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
}

export default Homepage;
