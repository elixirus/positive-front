import { dao_address } from '../../db/ctf/addresses'
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
import dao_abi from "../../db/PositiveDAO.json"
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { CustomDivider } from '../CustomDivider/CustomDivider';
// import { ethers } from 'ethers';
import { DataTable } from './DataTable';
// import React from 'react';

export type DataTableProps<Data extends object> = {
    data: Data[];
    columns: ColumnDef<Data, any>[];
};

// type taskConversion = {
//     name: string;
//     complexity: string;
//     points: string;
//     type: string;
//     status: string;
// };

// const tasks: taskConversion[] = [
//     {
//         name: "AntiRugPull",
//         complexity: "easy",
//         points: "0",
//         type: "EVM",
//         status: "open"
//     },
//     {
//         name: "DAO",
//         complexity: "easy",
//         points: "0",
//         type: "EVM",
//         status: "open"
//     },
//     {
//         name: "DAO 2",
//         complexity: "easy",
//         points: "0",
//         type: "EVM",
//         status: "open"
//     },
//     {
//         name: "Metamorphic",
//         complexity: "easy",
//         points: "0",
//         type: "EVM",
//         status: "open"
//     },
//     {
//         name: "WrappedEther",
//         complexity: "easy",
//         points: "0",
//         type: "EVM",
//         status: "open"
//     }

// ];

// const leaderColumnHelper = createColumnHelper<taskConversion>();

// const columns: ColumnDef<taskConversion, any>[] = [
//     leaderColumnHelper.accessor("name", {
//         cell: (info) => info.getValue(),
//         header: "name"
//     }),
//     leaderColumnHelper.accessor("complexity", {
//         cell: (info) => info.getValue(),
//         header: "complexity"
//     }),
//     leaderColumnHelper.accessor("type", {
//         cell: (info) => info.getValue(),
//         header: "type"
//     }),
//     leaderColumnHelper.accessor("status", {
//         cell: (info) => info.getValue(),
//         header: "status"
//     })
// ];

type TaskCreatedEvent = {
    taskId: string;
    creator: string;
    task_name: string;
    task_type: string;
    task_deadline: string;
    task_price: number;
    task_category: string;
    customThreshold: number;
    finished: boolean;
}


// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу\

// <Th>name</Th>
// <Th>type</Th>
// <Th>category</Th>
// <Th>deadline</Th>
// <Th>price</Th>
// <Th>finished</Th>

const columnHelper = createColumnHelper<TaskCreatedEvent>();
const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor("task_name", {
        cell: (info) => info.getValue(),
        header: "Name"
    }),
    columnHelper.accessor("task_type", {
        cell: (info) => info.getValue(),
        header: "Type"
    }),
    columnHelper.accessor("task_category", {
        cell: (info) => info.getValue(),
        header: "Category"
    }),
    columnHelper.accessor("task_deadline", {
        cell: (info) => info.getValue(),
        header: "Deadline"
    }),
    // columnHelper.accessor("task_price", {
    //     cell: (info) => info.getValue(),
    //     header: "Into"
    // }),
    columnHelper.accessor("task_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true
        }
    })
];

// function convertarr(arr: any[]) {

//     console.log("oldArr: ", arr)

//     let newArr = arr.forEach((event: any, i) => {
//         console.log("event i: ", i)
//         console.log("event description: ", event)
//         arr[i] = event.args.description
//     })

//     console.log("newArr: ", newArr)


//     return newArr
// }


// function wrapHex(hex: string) {
//     return ethers.toUtf8String(ethers.hexlify(hex))
//     // return ethers.utils.parseBytes32String(ethers.utils.hexlify(hex))
// }
export default function TaskList() {


    // const [totalSupply, setTotalSupply] = useState<string>()
    // const [ideas, setIdeas] = useState<string>()
    const [taskCreated, setTaskCreated] = useState<TaskCreatedEvent[]>([])
    const { account, isActive, provider } = useWeb3React()
    // const [sorting, setSorting] = React.useState<SortingState>([]);

    // const { data: balance, mutate } = useSWR([dao_address, 'balanceOf', account], {
    //     fetcher: fetcher(provider,),
    // })

    // useEffect(() => {
    //     if (!(isActive && account && provider)) return

    //     const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

    //     provider?.getCode(dao_address).then((result: string) => {
    //         //check whether it is a contract
    //         if (result === '0x') return

    //         dao_contract.getIdeas().then((result: string) => {
    //             setIdeas(result)
    //         }).catch('error', console.error)
    //     })
    //     //called only when changed to active
    // }, [isActive])

    useEffect(() => {

        async function getOldEvents() {

            const oldTaskCreated = dao_contract.filters.TaskCreated(null, null)
            let ev = await dao_contract.queryFilter(oldTaskCreated)

            // ev.map((event: any) => {
            //     // console.log("event: ", event.args.description)
            //     setTaskCreated([...taskCreated, event.args.description]);
            // })

            // setTaskCreated(ev.forEach((event: any, i) => {
            //     console.log("event i: ", i)
            //     console.log("event description: ", event)
            //     ev[i] = event.args.description
            // }));

            setTaskCreated(ev.reverse());

            // console.log("ev: ", ev)

        }

        if (!(isActive && account && provider)) return
        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider)

        getOldEvents()

        console.log("taskCreated: ", taskCreated)


        const newTaskCreated = dao_contract.filters.TaskCreated(null, null)

        dao_contract.on(newTaskCreated, (taksId, creator, description, event) => {
            console.log('TaskCreated: ', { taksId, creator, description, event })
            setTaskCreated([event.args.description, ...taskCreated]);
        })

        console.log("taskCreated: ", taskCreated)

        // remove listener when the component is unmounted
        return () => {
            dao_contract.removeAllListeners(newTaskCreated)
        }


        // trigger the effect only on component mount
    }, [isActive, account, provider, taskCreated])

    return (
        <>
            <CustomDivider title="Tasks" padding="5" />

            <DataTable data={taskCreated} columns={columns} />


            {/* <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <Th>type</Th>
                            <Th>category</Th>
                            <Th>deadline</Th>
                            <Th>price</Th>
                            <Th>finished</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {taskCreated.map((row: TaskCreatedEvent) => (
                            <Tr key={row.args.taskId}>
                                <Td>
                                    <Link href={"tasks/" + row.args.taskId}>{wrapHex(ethers.hexlify(row.args.description.task_name))}</Link>
                                </Td>
                                <Td>{wrapHex(row.args.description.task_category)}</Td>
                                <Td>{wrapHex(row.args.description.task_type)}</Td>
                                <Td>{wrapHex(row.args.description.task_deadline)}</Td>
                                <Td>{row.args.description.task_price.toNumber()}</Td>
                                <Td>{row.args.description.finished.toString()}</Td>
                            </Tr>
                        ))
                        }

                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>name</Th>
                            <Th>type</Th>
                            <Th>category</Th>
                            <Th>deadline</Th>
                            <Th>price</Th>
                            <Th>finished</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer> */}
        </>
    );
}