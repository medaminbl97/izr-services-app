import {
  Select,
  VStack,
  Text,
  Heading,
  Input,
  Stack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AppListItem from "./AppListItem";
import IZRButton from "../IZRButton";

interface PushToken {
  token: string;
  id: string;
}

interface Resp {
  tokens: PushToken[];
}

function Notifications() {
  const [tokens, setTokens] = useState<PushToken[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [NotificationInput, setNotificationInput] = useState(false);
  useEffect(() => {
    axios.get<Resp>("https://izr-cloud.online/PushToken").then((response) => {
      setTokens(response.data.tokens);
      //   console.log(tokens);
    });
  }, []);

  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const handleDelete = (id: string) => {
    if (id === "all") {
      axios.get("https://izr-cloud.online/deleteToken").then((response) => {
        console.log(response);
        setTokens([]);
      });
    } else {
      const atokens = tokens.filter((token) => token.id !== id);
      console.log(id);
      console.log(atokens);
      setTokens(atokens);
      axios
        .post("https://izr-cloud.online/deleteToken", { token: id })
        .then((response) => {
          console.log(response);
        });
    }
  };
  const pushNotification = async (tokens: string[]) => {
    await axios
      .post("https://izr-cloud.online/pushNotification", {
        tokens: tokens,
        title: title,
        subtitle: subtitle,
      })
      .then((response) => {
        console.log(response);
        setTitle("");
        setSubtitle("");
      });
  };
  return (
    <Stack
      width={"100%"}
      flex="flex"
      direction={"column"}
      justifyContent="left"
    >
      <Heading>Tokens</Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Tokens Anzeigen
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {tokens.map((token) => (
              <AppListItem
                id={token.id}
                onDelete={handleDelete}
                text={token.id}
              />
            ))}
            {tokens.length ? (
              <IZRButton
                title="Alle Tokens löschen"
                onClick={() => handleDelete("all")}
              />
            ) : null}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Heading>Benachritigung senden</Heading>
      <Text>Bitte Auswählen wer benachrichtigt werden soll:</Text>
      <Select
        placeholder="Select option"
        onChange={(event) => {
          console.log(event.target.value);
          if (!event.target.value) {
            setNotificationInput(false);
          } else if (event.target.value !== "alle") {
            setNotificationInput(true);
            setSelected([event.target.value]);
          } else {
            const stokens: string[] = [];
            tokens.map((token) => stokens.push(token.token));
            setSelected(stokens);
            setNotificationInput(true);
          }
        }}
      >
        {tokens.map((token) => (
          <option key={token.id} value={token.token}>
            {token.id}
          </option>
        ))}
        {tokens.length && <option value="alle">alle</option>}
      </Select>
      {NotificationInput && tokens.length ? (
        <VStack>
          <Input
            focusBorderColor="green.500"
            placeholder="Titel der Benachrichtigung . . ."
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <Input
            focusBorderColor="green.500"
            placeholder="Untertitel der Benachrichtigung . . ."
            onChange={(event) => setSubtitle(event.target.value)}
            value={subtitle}
          />

          <IZRButton
            title="Senden"
            onClick={() => pushNotification(selected)}
          />
        </VStack>
      ) : null}
    </Stack>
  );
}

export default Notifications;
