// import {
//     Table,
//     TableCaption,
//     TableContainer,
//     Tbody,
//     Td,
//     Tfoot,
//     Th,
//     Thead,
//     Tr,
// } from '@chakra-ui/react';
// import { formatEther } from "@ethersproject/units"
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
// import dao_abi from '../../db/PositiveDAO.json';
// import { dao_address } from '../../db/addresses';
// import { Contract } from "@ethersproject/contracts";
import { CustomDivider } from '../CustomDivider/CustomDivider';

// const fetcher = (library: any) => (...args: any) => {
//     const [method, ...params] = args
//     return library[method](...params)
// }

// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу

export default function EventList() {

    // const [totalSupply, setTotalSupply] = useState<string>()
    // const [ideas, setIdeas] = useState<string>()

    const { account, isActive, provider } = useWeb3React()

    // const { data: balance, mutate } = useSWR([dao_address, 'balanceOf', account], {
    //     fetcher: fetcher(provider,),
    // })

    useEffect(() => {
        // if (!(isActive && account && provider)) return

        // const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

        // const event = dao_contract.filters.TaskCreated(null, null)

        // dao_contract.on(event, (taskId, creator, task_description, event) => {
        //     console.log('TaskCreated|sent', { taskId, creator, task_description, event })
        //     // mutate(undefined, true)
        // })

        //called only when changed to active
    }, [isActive, account, provider])

    // useEffect(() => {
    //     if (!(isActive && account && provider)) return



    //     // const toMe = dao_contract.filters.Transfer(null, account)
    //     // dao_contract.on(toMe, (from, to, amount, event) => {
    //     //     console.log('Transfer|received', { from, to, amount, event })
    //     //     mutate(undefined, true)
    //     // })

    //     // remove listener when the component is unmounted
    //     return () => {
    //         dao_contract.removeAllListeners(toMe)
    //         dao_contract.removeAllListeners(fromMe)
    //     }

    //     // trigger the effect only on component mount
    // }, [isActive, account])



    return (
        <>
            <CustomDivider title="Events" padding="5" />
        </>
    );
}