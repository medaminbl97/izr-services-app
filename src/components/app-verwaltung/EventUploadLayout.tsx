import {
  Button,
  HStack,
  Heading,
  Input,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { MutableRefObject, useRef, useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import colors from "../styles/colors";
import { color } from "framer-motion";
import FormData from "form-data";
import axios from "axios";

interface props {
  onSubmit: (title: string, subtitle: string) => void;
}

export function EventUploadLayout({ onSubmit }: props) {
  const [TextDescription, setTextDescription] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [date, setDate] = useState("");
  const [Description, setDescription] = useState("");
  const [DescriptionFile, setDescriptionFile] = useState<
    string | ArrayBuffer | undefined
  >("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<FileList | null>();
  const [flyer, setFlyer] = useState<FileList | null>();

  const handleUpload = async () => {
    setSubmitting(true);
    file && console.log("file : " + file[0].size);
    let data = new FormData();
    data.append("title", title);
    data.append("subtitle", subtitle);
    data.append("date", date);
    data.append("link", link);
    flyer && data.append("file", flyer[0]);

    if (TextDescription) {
      data.append("description", Description);
    } else {
      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const content = event.target?.result as string;
          setDescriptionFile(content);
          console.log(content);
        };

        reader.readAsText(file[0]);
        data.append("description", DescriptionFile);
      }
      console.log(Description);
    }
    await axios
      .post("https://izr-cloud.online/pushNotification", {
        tokens: "all",
        title: title,
        subtitle: subtitle,
      })
      .then((response) => {
        console.log(response);
      });
    await axios
      .post("https://izr-cloud.online/getEvents", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxContentLength: 16 * 1024 * 1024,
      })
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setSubTitle("");
        setDate("");
        setDescription("");
        setDescriptionFile("");
        setLink("");
        setSubmitting(false);
      });
  };
  const handleChange = (what_is_chnaged: string) => {};
  return (
    <Stack width={"100%"} spacing={3}>
      <Heading>Veranstalung Hinzufügen</Heading>
      <Show above="lg">
        <Input
          focusBorderColor="green.500"
          placeholder="name der Vertanstaltung . . ."
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <Input
          focusBorderColor="green.500"
          placeholder="Untertitle der Vertanstaltung . . ."
          onChange={(event) => setSubTitle(event.target.value)}
          value={subtitle}
        />
      </Show>
      <Show below="lg">
        <Textarea
          focusBorderColor="green.500"
          placeholder="name der Vertanstaltung . . ."
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <Textarea
          focusBorderColor="green.500"
          placeholder="Untertitle der Vertanstaltung . . ."
          onChange={(event) => setSubTitle(event.target.value)}
          value={subtitle}
        />
      </Show>

      <Input
        focusBorderColor="green.500"
        placeholder="datum der Vertanstaltung . . ."
        onChange={(event) => setDate(event.target.value)}
        value={date}
      />
      <Textarea
        focusBorderColor="green.500"
        placeholder="Anmeldungslink der Vertanstaltung falls vorhanden  . . ."
        flexWrap={"wrap"}
        onChange={(event) => setLink(event.target.value)}
        value={link}
      />
      <Heading fontSize={20}>Flyer auswählen</Heading>
      <input
        onChange={(event) => setFlyer(event.target.files)}
        type="file"
      ></input>
      <Heading fontSize={20}>Beschreibung der Veranstaltung</Heading>
      <HStack justifyContent={"space-between"}>
        {TextDescription && (
          <Text color={colors.primary}>Berchreibung selber Schreiben</Text>
        )}
        {!TextDescription && (
          <Text color={colors.primary}>Text Datei Hochladen</Text>
        )}
        <Switch
          width={8}
          onChange={() => {
            setTextDescription(!TextDescription);
            console.log(
              TextDescription
                ? "Text Description true"
                : "Text Description false"
            );
          }}
        />
      </HStack>
      {TextDescription && (
        <Textarea
          focusBorderColor="green.500"
          placeholder="bitte die Veranstlatung ausführlich Beschreiben (Datum, Zeit, Ort, Angebote, Kosten, Ameldungskosten usw . . .) "
          flexWrap={"wrap"}
          height={200}
          onChange={(event) => setDescription(event.target.value)}
          value={Description}
        />
      )}
      {!TextDescription && (
        <input
          onChange={(event) => setFile(event.target.files)}
          type="file"
        ></input>
      )}
      <Button
        _hover={{ backgroundColor: colors.sec, color: "black" }}
        onClick={() => {
          handleUpload();
          onSubmit(title, subtitle);
        }}
        color="white"
        backgroundColor={colors.primary}
        isLoading={submitting}
        loadingText={"wird hinzugefügt..."}
        isDisabled={flyer && title ? false : true}
      >
        Hinzufügen
      </Button>
    </Stack>
  );
}
