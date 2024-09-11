import {

    GridItem,
} from '@chakra-ui/react';
// import {  useState } from 'react';
// import { useWeb3React } from '@web3-react/core';
import { CustomDivider } from '../CustomDivider/CustomDivider';
// import { ethers } from 'ethers';
// import { useLocation, useParams } from 'react-router-dom';

// type TaskEvent = {
//     // TODO: информация по событиям происходщяим с задачей
// }


// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу

// function wrapHex(hex: string) {
//     return ethers.toUtf8String(ethers.hexlify(hex))
//     // return ethers.utils.parseBytes32String(ethers.utils.hexlify(hex))
// }

export default function TaskDescription({description}: any) {

    // const [totalSupply, setTotalSupply] = useState<string>()
    // const [ideas, setIdeas] = useState<string>()
    // const [task, setTask] = useState<string[]>([])
    // const [taskName, setTaskName] = useState<string>("")
    // const location = useLocation();
    // const { id } = useParams();
    // const { account, isActive, hooks, provider } = useWeb3React()

    // useEffect(() => {
    //     if (!(isActive && account && provider)) return

    //     const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

    //     provider?.getCode(dao_address).then((result: string) => {
    //         //check whether it is a contract
    //         if (result === '0x') return
    //         dao_contract.getTaskById(id).then((result: string) => {
    //             // console.log("get task by id: ", result)
    //             setTask(result)
    //         }).catch('error', console.error)
    //     })

    //     console.log("task: ", task)
    //     //called only when changed to active
    // }, [isActive])

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
        <>
            <CustomDivider title={"Description"} padding="5" />

            <GridItem colSpan={1}>
                {/* {description} */}
                test
            </GridItem>

        </>
    );
}