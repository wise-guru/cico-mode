import { useState } from "react";
import TableRow from "./TableRow";

function WeightTable(props) {
  const [weeks, setWeeks] = useState(props.value ?? 52);

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
