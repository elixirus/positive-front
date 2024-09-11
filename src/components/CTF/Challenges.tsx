import { Stack, TableContainer, Tfoot, Link, Center, Tag, SpaceProps } from "@chakra-ui/react";
import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import challenges from "../../db/ctf/challenges.json";

interface BlogAuthorProps {
    date: Date;
    name: string;
}

interface IBlogTags {
    tags: Array<string>;
    margin?: SpaceProps['margin'];
}

const StatusTags: React.FC<IBlogTags> = (props) => {
    return (
        <>
            {props.tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag} margin={props.margin} >
                        {tag}
                    </Tag>
                );
            })}
        </>
    );
};


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
    date: string;
};


export default function Challenges() {
    // TODO: refactor to react table
    // const [sorting, setSorting] = React.useState<SortingState>([]);

    const compareDifficultyChallanges = (a: challenge, b: challenge) => {

        if (a.difficulty < b.difficulty) {
            return -1;
        }
        if (a.difficulty > b.difficulty) {
            return 1;
        }
        return 0;
    };

    const compareStatusChallanges = (a: challenge, b: challenge) => {

        if (a.status < b.status) {
            return -1;
        }
        if (a.status > b.status) {
            return 1;
        }
        return 0;
    };

    const compareDateChallanges = (a: challenge, b: challenge) => {

        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    };

    let filtered = challenges.challenges //.challenges.filter(item => item.status < "archive");
    console.log("filtered: ", filtered);
    let challanges_difficulty = filtered.sort(compareDifficultyChallanges);
    let challanges_status = challanges_difficulty.sort(compareStatusChallanges);
    console.log("challanges: ", challanges_status);
    let challanges_date = challanges_status.sort(compareDateChallanges);
    console.log("challanges: ", challanges_status);

    let challanges = challanges_date;

    return (

        <Stack>
            {/* <CustomDivider title="Challenges" /> */}
            <TableContainer>
                <Table variant='simple'>
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>№</Th>
                            <Th>name</Th>
                            <Th>complexity</Th>
                            <Th>points</Th>
                            <Th>type</Th>
                            <Th>status</Th>
                            <Th>date</Th>

                        </Tr>
                    </Thead>
                    <Tbody>

                        {challanges.map((row: challenge, index: React.Key | null | undefined) => (

                            <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    {/* TODO: trim spaces in row.name */}
                                    <Link href={"ctf/" + row.name}>{row.name}</Link>
                                </Td>
                                <Td>{row.difficulty}</Td>
                                <Td>{row.points}</Td>
                                <Td><StatusTags tags={[row.type]} /></Td>
                                <Td><StatusTags tags={[row.status]} /></Td>
                                <Td>{row.date}</Td>
                            </Tr>
                        ))
                        }

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>№</Th>

                            <Th>name</Th>
                            <Th>complexity</Th>
                            <Th>points</Th>
                            <Th>type</Th>
                            <Th>status</Th>
                            <Th>date</Th>

                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>


        </Stack>
    );
}
