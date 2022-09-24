function Homepage() {
  return (
    <div>
      <h1>Weight Calculator</h1>
      <form>
        <input type={"radio"} name={"gender"} value={"male"} id={"male"} />
        <label htmlFor={"male"}>Male</label>

        <input type={"radio"} name={"gender"} value={"female"} id={"female"} />
        <label htmlFor={"female"}>Female</label>

        <div className="row">
          <label>What is your weight?</label>
          <input type={"number"} name={"weight"} id={"weight"} />

          <label htmlFor="units">Units:</label>
          <select name="units" id="units">
            <option value={"lbs"}>lbs</option>
            <option value={"kg"}>kgs</option>
          </select>
        </div>

        <div className="row">
          <label htmlFor="calories">How many calories do you plan to eat in a day?</label>
          <input type={"number"} name={"calories"} id={"calories"} />
        </div>

        <div className="row">
          <label htmlFor="age">What is your age?</label>
          <input type={"number"} name={"age"} id={"age"} />
        </div>

        <div className="row">
          <label htmlFor="height">What is your height?</label>
          <input type={"number"} name={"height"} id={"height"} placeholder={"5'0"} />

          <select>
            <option value={"ft"}>ft</option>
            <option value={"cm"}>cm</option>
          </select>
        </div>

        <div>
          <label>How active are you?</label>
          <select name="activity" id="activity">
            <option value={"sedentary"}>Sedentary</option>
            <option value={"lightly"}>Lightly active</option>
            <option value={"moderately"}>Moderately Active</option>
            <option value={"very"}>Very Active</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Homepage;
