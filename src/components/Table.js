import React from "react";
import "./../styles/Table.css";
import numeral from "numeral";

const Table = ({ countryTable }) => {
  console.log(countryTable);
  const result = countryTable.sort((a, b) => b.cases - a.cases);

  return (
    <div className="table">
      {result.map((c) => (
        <tr>
          <td> {c.country} </td>
          <td>
            <strong>{numeral(c.cases).format()}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
