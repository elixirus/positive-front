import {
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Text,
    Thead,
    Tr,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllSpec, getSpecFromBackend, getTlaSpec, submitFormalSpecAsSuccesssfull, submitLevelInstance } from "../../../utils/ctf.utils";
import { EventLog, Log } from "ethers";
import { CustomDivider } from "../../CustomDivider/CustomDivider";
import ctf_address from '../../../db/ctf/ctf_address.json';

export default function Administration() {
    const { t } = useTranslation();
    const { id } = useParams();
    const { account, isActive, provider } = useWeb3React();
    const location = useLocation();
    // const [addresses, setAddresses] = useState(false)


    const [started, setStarted] = useState<boolean>(false);
    const [currentInstance, setCurrentInstance] = useState<string>("");
    const [tlaSpecs, setTlaSpec] = useState<(EventLog | Log)[]>([])
    const [specs, setSpecs] = useState<[]>([])


    const toAddress = (address: string) => {
        return "0x" + address.substring(64, 24);
    }

    const toSpec = (address: string) => {
        return "0x" + address.substring(64, 24);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!(isActive && account && provider)) return;

            try {
                const code = provider.getCode(ctf_address.formalMethods);
                if (code === "0x") return;

                getTlaSpec(account, provider).then((result: any) => {
                    setTlaSpec(result);
                }).catch((error: any) => {
                    console.log("getTlaSpec: ", error)
                })

                getAllSpec(provider).then((result: any) => {
                    console.log("USEEFFECT getAllSpec: ", result)
                    setSpecs(result);
                }).catch((error: any) => {
                    console.log("USEEFFECT getAllSpec: ", error)
                    setSpecs([]);
                })

            } catch (error) {
                console.error("Error: ", error);
            }
        }

        fetchData();

    }, [location.pathname, isActive, account, provider])

    const handleSolve = (user: any) => {
        console.log("handleSolve user: ", user)
        if (!(isActive && account && provider)) return;
        console.log()
        submitFormalSpecAsSuccesssfull(user, currentInstance, provider);
    };

    const handleGetSpec = (spec: any) => {
        console.log("handleSolve user: ", spec)
        if (!(isActive && account && provider)) return;
        console.log()
        getSpecFromBackend(spec);
        // console.log("solve")
    };

    return (
        <Container maxW={"7xl"}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 6, md: 12 }}
                py={{ base: 18, md: 18 }}>
                <Heading
                    lineHeight={'110%'}>
                    <Text color={'red'}>
                        Judge
                    </Text>

                </Heading>
                <CustomDivider title="Formal specs" />

                <Grid
                    templateColumns="repeat(5, 1fr)"
                >
                    <GridItem colSpan={4}>

                        <TableContainer>
                            <Table variant='simple'>
                                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                                <Thead>
                                    <Tr>
                                        <Th>user</Th>
                                        <Th>spec</Th>
                                        <Th>action</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {tlaSpecs.map((row: any, index: React.Key | null | undefined) => (
                                        <Tr key={index}>
                                            <Td>
                                                {/* TODO: trim spaces in row.name */}
                                                <a href={"/api/v1/users/" + toAddress(row[0])} style={{ textDecoration: "underline" }}>{toAddress(row[0])}</a>
                                            </Td>
                                            <Td>
                                                <Button onClick={() => handleGetSpec(row[0])}>
                                                    {row[0].substring(0, 32) + ' ... ' + row[0].substring(row[0].length - 10)}
                                                </Button>
                                            </Td>

                                            <Td>
                                                <Button onClick={() => handleSolve(toAddress(row[0]))}>Solve</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                    }

                                    {specs.map((row: any, index: React.Key | null | undefined) => (
                                        <Tr key={index}>
                                            <Td>
                                                {/* TODO: trim spaces in row.name */}
                                                <a href={"/api/v1/users/" + toAddress(row[0])} style={{ textDecoration: "underline" }}>{toAddress(row[0])}</a>
                                            </Td>
                                            <Td>
                                                <a href={"api/v1/fm/solution/" + toAddress(row[0])} style={{ textDecoration: "underline" }}>{row[0].substring(0, 32) + ' ... ' + row[0].substring(row[0].length - 10)}</a>
                                            </Td>

                                            <Td>
                                                <Button onClick={handleSolve(toAddress(row[0]))}>Solve</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                    }

                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>user</Th>
                                        <Th>spec</Th>
                                        <Th>action</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>

                    </GridItem>

                    {/* <GridItem colSpan={1}>
                        <CustomDivider title={t("challengeMetaInfo")} padding="5" />

                        <p>{t("challengeName")}: </p>
                        <p>Категория: </p>
                        <p>Срок: </p>
                        <p>Стоимость: </p>
                        <p>Тип: </p>

                        <CustomDivider title="Your stats" padding="5" />

                        <CustomDivider title="Actions" padding="5" />

                        <Stack spacing={4}>
                            buttons
                        </Stack>

                    </GridItem> */}
                </Grid>
            </Stack>
        </Container>


    );
}
