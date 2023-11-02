import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import CSVInput from "./CSVInput";
import SchuelerListe, { student } from "./SchuelerListe";
import IBOX from "./SchulJahr";
import router from "../router";
import { Stack } from "@chakra-ui/react";
import axios from "axios";

function SchulJahrDetails() {
  const { jahr } = useParams();

  const boxes = [" Schüler", "Leherer", "Klassen"];
  const boxesurl = ["schueler", "lehrer", "klassen"];

  return (
    <Stack direction={{ lg: "row", base: "column" }}>
      {boxes.map((box, index) => (
        <IBOX
          text={box}
          onClick={() => router.navigate(`../${jahr}/${boxesurl[index]}`)}
        />
      ))}
    </Stack>
  );
}

export default SchulJahrDetails;
