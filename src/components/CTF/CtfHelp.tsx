import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";

import { ColumnDef } from "@tanstack/react-table";

import challenges from "../../db/ctf/challenges.json";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

type challenge = {
  name: string;
  code: string;
  difficulty: string;
  description: string;
  points: string;
  type: string;
  status: string;
  address: string;
};

export default function Faucets() {
  return (
    <Container maxW={"7xl"}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <Heading>Faucets</Heading>
          <br></br>
          <p>
            <a href="https://faucets.chain.link/polygon-amoy">
              {" "}
              - 0.5 MATIC - https://faucets.chain.link/polygon-amoy
            </a>
          </p>
          <br></br>
          <p>
            <a href="https://www.alchemy.com/faucets/polygon-amoy">
              {" "}
              - 0.2 MATIC - https://www.alchemy.com/faucets/polygon-amoy{" "}
            </a>
          </p>
          <br></br>

          <p>
            <a href="https://faucet.polygon.technology/ ">
              {" "}
              - 0.2 MATIC - https://faucet.polygon.technology/
            </a>
          </p>
          <br></br>
          <p>
            <a href="https://faucet.quicknode.com/polygon/amoy">
              {" "}
              - 0.025 MATIC - https://faucet.quicknode.com/polygon/amoy
            </a>
          </p>
        </GridItem>

        <GridItem colSpan={1}></GridItem>
      </Grid>
    </Container>
  );
}
