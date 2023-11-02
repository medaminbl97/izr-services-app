import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import CSVInput from "./CSVInput";
import ReactLoading from "react-loading";
import {
  Box,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Student from "./SListItem";
import SList from "./SList";
export interface student {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  father: string;
}

interface resp {
  acknowledged: string;
  data: student[];
}
function SchuelerListe() {
  const { jahr } = useParams();
  const [students, setStudents] = useState<student[] | undefined>();
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    checkData();
  }, []);

  const checkData = async () => {
    setLoad(true);
    await axios
      .get<resp>(`https://izr-cloud.online/schule/schueler/${jahr}`)
      .then((response) => {
        console.log(response.data.acknowledged);
        if (response.data.acknowledged === "True") {
          setStudents(response.data.data);
          setShow(true);
        }
        if (response.data.acknowledged === "False") {
          console.log(response.data);
          setShow(false);
        }
        setLoad(false);
      });
  };

  const handleSubmit = (data: student[]) => {
    setLoad(true);
    axios
      .post("https://izr-cloud.online/schule/setdata", {
        jahr: jahr,
        type: "schueler",
        data: data,
      })
      .then((response) => {
        console.log(response.data);
        response.data["acknowledged"] === "True" && setShow(true);
        setStudents(data);
        setLoad(false);
      });
  };
  return (
    <>
      {!load && !show && <CSVInput onSubmit={handleSubmit} />}
      {!load && show && students && (
        <SList
          data_type="schüler"
          data={students}
          heading_data={[
            students[0].first_name,
            students[0].last_name,
            students[0].gender,
            students[0].email,
            students[0].father,
          ]}
        />
      )}
    </>
  );
}

export default SchuelerListe;
