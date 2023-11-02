import {
  Box,
  Button,
  List,
  ListItem,
  Show,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import style from "./styles/common.module.css";
import IZRButton from "./IZRButton";
import axios from "axios";
import io from "socket.io-client";
import { Outlet } from "react-router-dom";

interface User {
  name: string;
  surname: string;
  username: string;
  adding_date: string;
  id: string;
}

interface Resp {
  users: User[];
}

function Administration() {
  const [users, setUsers] = useState<User[]>([]);
  const [visible, setVisible] = useState(false);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const socket = io("https://izr-cloud.online"); // Use your Flask server address
  //   // Listen for the 'new_data' event
  //   socket.on("Users", (data) => {
  //     console.log("New data received:", data);

  //     // Trigger your fetch or update logic here
  //     // fetchSomething();
  //   });

  //   return () => {
  //     // Disconnect the socket when the component is unmounted
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    axios.get<Resp>("https://izr-cloud.online/getUsers").then((response) => {
      setUsers(response.data.users);
      console.log(response.data);
    });
  }, []);

  const handleDelete = (del_user: User) => {
    const new_users = users.filter((user) => user === del_user);
    axios
      .post<Resp>("https://izr-cloud.online/deleteUser", del_user)
      .then((response) => console.log(response.data));
  };
  const handleAdd = async () => {
    await axios
      .post<Resp>("https://izr-cloud.online/addUser", {
        name: name,
        username: username,
        adding_date: new Date().toLocaleDateString(),
        password: password,
        surname: surname,
      })
      .then((response) => console.log(response.data));
    await axios
      .get<Resp>("https://izr-cloud.online/getUsers")
      .then((response) => setUsers(response.data.users));
    setName("");
    setSurname("");
    setPassword("");
    setUsername("");
  };
  return (
    <VStack className={style["font-formatted"]} padding={1}>
      <NavBar page="Administration"></NavBar>
      <VStack
        width={{ base: "100%", lg: "90%" }}
        // border={"1px solid lightgray"}
        padding={1}
        borderRadius={10}
        shadow={"0px 0px 5px 0px gray"}
        justifyContent={"center"}
      >
        <Show above="lg">
          <TableContainer width={"100%"}>
            <Table variant="simple">
              <TableCaption>Islamisches Zentrum Regensburg</TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Nachname</Th>
                  <Th>Benutzername</Th>
                  <Th>Hinzugefügt am</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr
                    onMouseOver={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                  >
                    <Td>{user.name}</Td>
                    <Td>{user.surname}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.adding_date}</Td>
                    <Td>
                      <Button
                        size={"sm"}
                        opacity={visible ? 1 : 0}
                        onClick={() => handleDelete(user)}
                      >
                        Löschen
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {adding && (
            <FormControl isRequired padding={10}>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                placeholder="name"
                onChange={(value) => setName(value.target.value)}
              />
              <FormLabel>Nachname</FormLabel>
              <Input
                placeholder="First Nachname"
                onChange={(value) => setSurname(value.target.value)}
                value={surname}
              />
              <FormLabel>Benutzername</FormLabel>
              <Input
                placeholder="First Benutzername"
                onChange={(value) => setUsername(value.target.value)}
                value={username}
              />
              <FormLabel>Passwort</FormLabel>
              <Input
                placeholder="Passwort"
                onChange={(value) => setPassword(value.target.value)}
                value={password}
                type="password"
              />
            </FormControl>
          )}
          <IZRButton
            title="Admin Hinzufügen"
            onClick={() => {
              adding && handleAdd();
              setAdding(!adding);
            }}
          />
        </Show>
        <Show below="lg">
          {users.map((user) => (
            <List
              key={user.id}
              border={"1px solid lightgray"}
              padding={5}
              width={"100%"}
              flex={"flex"}
              borderRadius={10}
              spacing={5}
            >
              <ListItem justifyContent={"space-between"}>
                <Text width={"100%"} borderBottom={"1px solid lightgray"}>
                  Name : <strong>{user.name}</strong>
                </Text>
              </ListItem>
              <ListItem justifyContent={"space-around"}>
                <Text width={"100%"} borderBottom={"1px solid lightgray"}>
                  Nachname : <strong>{user.surname}</strong>
                </Text>
              </ListItem>
              <ListItem>
                <Text width={"100%"} borderBottom={"1px solid lightgray"}>
                  Benutzername : <strong>{user.username}</strong>
                </Text>
              </ListItem>
              <ListItem>
                <Text width={"100%"} borderBottom={"1px solid lightgray"}>
                  Hinzugefügt am : <strong>{user.adding_date}</strong>
                </Text>
              </ListItem>
              <ListItem>
                <Button onClick={() => handleDelete(user)} size={"sm"}>
                  Löschen
                </Button>
              </ListItem>
            </List>
          ))}
        </Show>
      </VStack>
    </VStack>
  );
}

export default Administration;
