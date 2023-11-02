import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AppListItem from "./AppListItem";
import axios from "axios";
import { eventNames } from "process";
export interface event {
  id: string;
  title: string;
  flyer: string;
}
interface prpos {
  events: event[];
  onDeleteEvents: () => void;
  onDeleteEvent: (id: string) => void;
}

function EventsList({ events, onDeleteEvents, onDeleteEvent }: prpos) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (
        events[0].flyer !== "https://izr-cloud.online/getEvents/No_Events.jpg"
      ) {
        setShow(true);
      }
    } catch (e) {
      setShow(false);
    }
  }, []);
  return (
    <VStack width={"100%"}>
      <Heading>Aktuelle Verantalungen</Heading>
      {show ? (
        <>
          <List
            padding={3}
            borderRadius={10}
            width={"100%"}
            // border={"1px solid lightgray"}
          >
            {events?.map(
              (event) =>
                event.id && (
                  <AppListItem
                    text={event?.title}
                    id={event?.id}
                    onDelete={onDeleteEvent}
                  ></AppListItem>
                )
            )}
          </List>
          <Button onClick={onDeleteEvents}>Alle Veranstaltungen löschen</Button>
        </>
      ) : (
        <Text>
          Wir haben im Moment keine Veranstaltungen. Sie können aber wie unten
          gezeigt eine neue Hinzufügen
        </Text>
      )}
    </VStack>
  );
}

export default EventsList;
