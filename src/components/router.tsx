import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createHashRouter,
} from "react-router-dom";
import Home from "./Home";
import AppVerwaltung from "./app-verwaltung/AppVerwaltung";
import SchuleVerwaltung from "./schule/SchuleVerwaltung";
import MeetingVerwaltung from "./MeetingVerwaltung";
import Administration from "./Administration";
import PrivacyPolicies from "./PrivacyPolicies";
import SchulJahrDetails from "./schule/SchulJahrDetails";
import LehererListe from "./schule/LehererListe";
import SchuelerListe from "./schule/SchuelerListe";
import Klassen from "./schule/Klassen";
import JahreUebersicht from "./schule/JahreUebersicht";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/izrApp",
    element: <AppVerwaltung />,
  },
  {
    path: "/izrSchule",
    element: <SchuleVerwaltung />,
    children: [
      { path: "jahreuebersicht", element: <JahreUebersicht /> },
      {
        path: ":jahr",
        element: <SchulJahrDetails />,
      },
      { path: ":jahr/lehrer", element: <LehererListe /> },
      { path: ":jahr/schueler", element: <SchuelerListe /> },
      { path: ":jahr/klassen", element: <Klassen /> },
    ],
  },
  {
    path: "/izrMeeting",
    element: <MeetingVerwaltung />,
  },
  {
    path: "/admins",
    element: <Administration />,
  },
  {
    path: "/appPrivacyPolicies",
    element: <PrivacyPolicies />,
  },
]);

export default router;
