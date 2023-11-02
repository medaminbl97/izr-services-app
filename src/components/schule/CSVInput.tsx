import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Papa, { ParseResult } from "papaparse";
import { student } from "./SchuelerListe";

interface props {
  onSubmit: (data: student[]) => void;
}

function CSVInput({ onSubmit }: props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      Papa.parse(file, {
        complete: (result: ParseResult<string[]>) => {
          // `result.data` contains the parsed CSV data as an array of arrays
          const mydata: student[] = [];
          result.data.map((data: string[]) =>
            mydata.push({
              first_name: data[0],
              last_name: data[1],
              email: data[2],
              gender: data[3],
              father: data[4],
            })
          );

          onSubmit(mydata);
        },
      });
    }
  };
  return (
    <>
      <label>hallo</label>
      <input type="file" onChange={handleChange} accept=".csv"></input>
    </>
  );
}

export default CSVInput;
