import {
    Button,
    Container,
    Grid,
    GridItem
} from '@chakra-ui/react';
import { dao_address } from '../../db/ctf/addresses'
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
import dao_abi from "../../db/PositiveDAO.json"
import { CustomDivider } from '../CustomDivider/CustomDivider';
import { useParams } from 'react-router-dom';
import EventList from './EventList';
import TaskDescription from './TaskDescription';

// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу

// function wrapHex(hex: string) {
//     return ethers.toUtf8String(ethers.hexlify(hex))
//     // return ethers.utils.parseBytes32String(ethers.utils.hexlify(hex))
// }

export default function TaskPage() {

    const [task, setTask] = useState<string[]>([])
    const { id } = useParams();
    const { account, isActive, provider } = useWeb3React()

    useEffect(() => {
        if (!(isActive && account && provider)) return

        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

        provider?.getCode(dao_address).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return
            dao_contract.getTaskById(id).then((result: string) => {
                // console.log("get task by id: ", result)
                setTask(result)
            }).catch('error', console.error)
        })

        console.log("task: ", task)
        //called only when changed to active
    }, [isActive, account, provider, id, task])

    // useEffect(() => {

    //     if (!(isActive && account && provider)) return
    //     const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider)

    //     async function getOldEvents() {
    //         const oldTaskCreated = dao_contract.filters.TaskCreated(null, null)
    //         let ev = await dao_contract.queryFilter(oldTaskCreated)

    //         setTask(ev);
    //     }
    //     getOldEvents()

    //     // const newTaskCreated = dao_contract.filters.TaskCreated(null, null)
    //     // dao_contract.on(newTaskCreated, (taksId, creator, description, event) => {
    //     //     console.log('TaskCreated: ', { taksId, creator, description, event })
    //     //     setTaskCreated([...taskCreated, event]);
    //     // })

    //     // // remove listener when the component is unmounted
    //     // return () => {
    //     //     dao_contract.removeAllListeners(newTaskCreated)
    //     // }

    //     // trigger the effect only on component mount
    // }, [isActive, account])

    return (
        <Container maxW={'7xl'}>

            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
            >

                <GridItem colSpan={4}>
                    <TaskDescription description={"test"} />
                    <EventList />
                </GridItem>

                <GridItem colSpan={1}>
                    {/* <p>Название: {wrapHex(task.task_name)}</p>
                    <p>Категория: {wrapHex(task.task_category)}</p>
                    <p>Срок: {wrapHex(task.task_deadline)}</p>
                    <p>Стоимость: {task.task_price.toNumber()}</p>
                    <p>Тип: {wrapHex(task.task_type)}</p> */}

                    <CustomDivider title="Actions" padding="5" />
                    <Button>Solve Task</Button>
                </GridItem>
            </Grid>

        </Container>
    );
}