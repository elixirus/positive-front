// import Head from 'next/head';
import {
  Box,
  Container,
  Heading,
  Stack,
  TableContainer,
  Text,
  Tfoot,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  CtfUser,
  getCtfUsersFromJson,
} from "../../../utils/ctf.utils";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { CustomDivider } from "../../CustomDivider/CustomDivider";
import LeaderboardUserInfo from "./LeaderboardUserInfo";

export default function Leaderboard() {
  const { account, isActive, provider } = useWeb3React();
  const [users, setUsers] = useState<CtfUser[]>([]);

  useEffect(() => {

    const users = getCtfUsersFromJson();
    console.log("users: ", users)
    setUsers(users.sort(compare).reverse());

    if (!(isActive && account && provider)) return;

    // getUsersFromBackend()
    //   .then((result: any) => {
    //     console.log("getUsersFromBackend result: ", result);
    //     setUsers(result.sort(compare).reverse());
    //   })
    //   .catch((error: any) => {
    //     console.log("getUsersFromBackend error: ", error);
    //     setUsers([]);
    //   });

  }, [isActive, account, provider]);

  const compare = (a: CtfUser, b: CtfUser) => {

    var a_num_levels_completed = a.num_levels_completed;
    var b_num_levels_completed = b.num_levels_completed;

    var a_avg_completion_time = a.avg_completion_time;
    var b_avg_completion_time = b.avg_completion_time

    if (a_num_levels_completed < b_num_levels_completed) return -1;
    if (a_num_levels_completed > b_num_levels_completed) return 1;
    if (a_avg_completion_time > b_avg_completion_time) return -1;
    if (a_avg_completion_time < b_avg_completion_time) return 1;
    return 0;
  };

  return (
    <Container maxW={"7xl"}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 6, md: 12 }}
        py={{ base: 18, md: 18 }}
      >
        <Heading lineHeight={"110%"}>
          <br />
          <Text color={"red"}>Leaderboard</Text>
        </Heading>
        {/* <CustomDivider title="Leaderboard" /> */}

        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>username</Th>
                <Th>address</Th>
                <Th>completed</Th>
                <Th>avg.time</Th>
                <Th>points</Th>
                <Th>tags</Th>
              </Tr>
            </Thead>

            {users.length === 0 ? (
              <Tbody>
                <Tr key={0}>
                  <Td>{users.length + 1}</Td>
                  <Td>noone</Td>
                  <Td>noone</Td>
                  <Td>noone</Td>
                  <Td>noone</Td>

                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {users.map(
                  (row: CtfUser, index: React.Key | null | undefined) => (
                    <LeaderboardUserInfo user={row} key={index} />
                  )
                )}
              </Tbody>
            )}

            <Tfoot>
              <Tr>
                <Th>username</Th>
                <Th>address</Th>
                <Th>completed</Th>
                <Th>avg.time</Th>
                <Th>points</Th>
                <Th>tags</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}
