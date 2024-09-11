import {
    Button,
    Container,
    Stack,
} from '@chakra-ui/react';
import IdeaList from './TaskList';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
import useSWR from 'swr'
import dao_abi from '../../db/PositiveDAO.json';
import {dao_address } from '../../db/ctf/addresses';
import { formatEther } from "@ethersproject/units";

const fetcher = (library: any) => (...args: any) => {
    const [method, ...params] = args
    return library[method](...params)
}

export default function UserStatus() {
    const [symbol, setSymbol] = useState<string>("")
    const [totalSupply, setTotalSupply] = useState<string>()
    const [isStart, setIsStart] = useState<boolean>() // статус CTF
    const [statistics, setStatistics] = useState<string>() // адрес статистики


    const { account, isActive, hooks, provider } = useWeb3React()

    const { data: balance, mutate } = useSWR([dao_address, 'balanceOf', account], {
        fetcher: fetcher(provider),
    })

    useEffect(() => {
        if (!(isActive && account && provider)) return

        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

        provider?.getCode(dao_address).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return

            dao_contract.decimals().then((result: string) => {
                console.log("decimasl: ", result)
            }).catch('error', console.error)
        })
        //called only when changed to active
    }, [isActive])

    useEffect(() => {
        if (!(isActive && account && provider)) return

        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider)

        // listen for changes on an Ethereum address
        console.log(`listening for FeeChanged...`)

        const feeChanged = dao_contract.filters.FeeChanged(null)
        dao_contract.on(feeChanged, (amount, event) => {
            console.log('FeeChanged|sent', {amount, event })
            mutate(undefined, true)
        })

        // remove listener when the component is unmounted
        return () => {
            dao_contract.removeAllListeners(feeChanged)
        }

        // trigger the effect only on component mount
    }, [isActive, account])



    return (
        <> <div>
            <p>DAO address: {dao_address}</p>
            <p>DAO version:{totalSupply} {symbol}</p>
            <p>DAO token in current account:{balance
                ? parseFloat(formatEther(balance)).toFixed(1)
                : " "
            } {symbol}</p>
        </div>
        </>
    );
}