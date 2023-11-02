import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { HStack, Show, Stack, VStack } from "@chakra-ui/react";
import EventsList from "./EventsList";
import styles from "../styles/common.module.css";
import { EventUploadLayout } from "./EventUploadLayout";
import axios from "axios";
import { json } from "stream/consumers";
import Notifications from "./Notifications";
import { Outlet } from "react-router-dom";
export interface event {
  id: string;
  title: string;
  flyer: string;
}

interface resp {
  events: event[];
}

interface token {
  token: string;
}

interface rsp {
  tokens: token[];
}

function AppVerwaltung() {
  const [events, setEvents] = useState<event[]>();
  const [tokens, setTokens] = useState<token[]>([]);

  const getTokens = async () => {
    await axios
      .get<rsp>("https://izr-cloud.online/PushToken")
      .then((response) => {
        setTokens(response.data.tokens);
        console.log("these are my tokens :" + tokens);
      });
  };

  const getEvents = async () => {
    await axios
      .get<resp>("https://izr-cloud.online/getEvents/all")
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEvents();
    getTokens();
  }, []);

  const sendNotifications = async (title: string, subtitle: string) => {
    const token_list: string[] = [];
    await tokens.map((token) => token_list.push(token.token));
    await axios
      .post("https://izr-cloud.online/notify", {
        to: token_list,
        title: "Islamisches Zentrum Regensburg",
        sound: "default",
        body: title + "\n" + subtitle,
      })
      .then((response) => console.log(response));
  };

  const onSubmit = (title: string, subtitle: string) => {
    getTokens();
    sendNotifications(title, subtitle);
    setTimeout(() => {
      getEvents();
    }, 500);
  };

  const handleDeleteEvent = (id: string) => {
    const new_events = events?.filter((event) => event.id !== id);
    setEvents(new_events);

    console.log(id);
    axios
      .post("https://izr-cloud.online/deleteEvents/", { id: id })
      .then((response) => console.log(response.data));
  };
  const handleDeleteEvents = () => {
    setEvents([]);
    axios
      .get("https://izr-cloud.online/deleteEvents/")
      .then((response) => console.log(response.data));
  };
  return (
    <VStack
      className={styles["font-formatted"]}
      // width={{ lg: "100%" }}
      paddingX={{ base: 5, lg: 100 }}
      alignItems={"start"}
      paddingY={100}
    >
      <NavBar page="IZR-APP Verwaltung"></NavBar>;
      <Stack
        spacing={10}
        direction={{ base: "column", lg: "row" }}
        width={"100%"}
      >
        <EventsList
          onDeleteEvent={handleDeleteEvent}
          onDeleteEvents={handleDeleteEvents}
          events={events!}
        />
        <Show below="lg">
          <EventUploadLayout onSubmit={onSubmit} />
        </Show>
        {/* <EventsList
          onDeleteEvent={handleDeleteEvent}
          onDeleteEvents={handleDeleteEvents}
          events={events!}
        /> */}
      </Stack>
      <Show above="lg">
        <EventUploadLayout onSubmit={onSubmit} />
      </Show>
      <Notifications />
    </VStack>
  );
}

export default AppVerwaltung;
