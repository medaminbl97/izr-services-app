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
  const [students, setStudents] = useState<student[]>();
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
      {!load && show && (
        <TableContainer width={"90%"}>
          <Table variant="simple">
            <Tr>
              <Th width={300}>Name</Th>
              <Th width={300}>Nachname</Th>
              <Th width={300}>Geschlecht</Th>
              <Th width={400}>Email </Th>
              <Th>Vater's Name</Th>
            </Tr>
          </Table>
          <Box overflow={"auto"} height={"70vh"}>
            <Table variant="simple">
              <TableCaption>Islamisches Zentrum Regensburg</TableCaption>
              <Tbody>
                {students?.map((std) => (
                  <Tr
                  // onMouseOver={() => setVisible(true)}
                  // onMouseLeave={() => setVisible(false)}
                  >
                    <Td width={300}>{std.first_name}</Td>
                    <Td width={300}>{std.last_name}</Td>
                    <Td width={300}>{std.gender}</Td>
                    <Td width={400}>{std.email}</Td>
                    <Td>{std.father}</Td>
                    {/* <Td>
                    <Button
                      size={"sm"}
                      opacity={visible ? 1 : 0}
                      onClick={() => handleDelete(user)}
                    >
                      Löschen
                    </Button>
                  </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </TableContainer>
      )}
      {load && (
        <ReactLoading
          type={"bubbles"}
          color={"blue"}
          height={"20%"}
          width={"20%"}
        />
      )}
    </>
  );
}

export default SchuelerListe;
