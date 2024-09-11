import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from "@ethersproject/contracts";
// import ethers from "@ethersproject";
import dao_abi from '../../db/PositiveDAO.json';
import token_abi from '../../db/PositiveToken.json';
import { dao_address, token_address } from '../../db/ctf/addresses';
// import { formatEther } from "@ethersproject/units"
import { CustomDivider } from '../CustomDivider/CustomDivider';
import { formatEther } from "ethers";

// const fetcher = (library: any) => (...args: any) => {
//     const [method, ...params] = args
//     return library[method](...params)
// }

function InfoAboutToken() {
    const [totalSupply, setTotalSupply] = useState<string>()
    const [userBalance, setUserBalance] = useState<string>()

    const { account, isActive, provider } = useWeb3React()

    useEffect(() => {
        if (!(isActive && account && provider)) return
        const token_contract: Contract = new Contract(token_address, token_abi.abi, provider);

        provider?.getCode(token_address).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return

            token_contract.balanceOf(account).then((result: string) => {
                console.log("balanceOf result: ", result._hex.toString())
                setUserBalance(result._hex.toString())
            }).catch('error', console.error)

            token_contract.totalSupply().then((result: string) => {
                console.log("totalSupply result: ", result._hex.toString())
                setTotalSupply(result._hex.toString())
            }).catch('error', console.error)

        })
        //called only when changed to active
    }, [isActive, account, provider])


    return (
        <> <div>

            <p>Token supply: {totalSupply
                ? parseFloat(formatEther(totalSupply)).toFixed(1)
                : " "
            }</p>
            <p>Your balance: {userBalance
                ? parseFloat(formatEther(userBalance)).toFixed(1)
                : " "
            }</p>
        </div>
        </>
    );
}

function InfoAboutDAO() {
    const { account, isActive, provider } = useWeb3React()

    const [isPause, setIsPause] = useState<string>()
    const [fee, setFee] = useState<string>()

    useEffect(() => {
        if (!(isActive && account && provider)) return

        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

        provider?.getCode(dao_address).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return

            dao_contract.isPause().then((result: string) => {
                setIsPause(result.toString())
            }).catch('error', console.error)

            dao_contract.fee().then((result: string) => {
                console.log("fee: ", result._hex.toString())
                setFee(result._hex.toString())
            }).catch('error', console.error)

        })
        //called only when changed to active
    }, [isActive, account, provider])

    useEffect(() => {
        if (!(isActive && account && provider)) return

        const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider)

        // listen for changes on an Ethereum address
        console.log(`listening for FeeChanged...`)

        const feeChanged = dao_contract.filters.FeeChanged(null)

        dao_contract.on(feeChanged, (amount, event) => {
            console.log('FeeChanged|sent', { amount, event })
            // mutateFee(undefined, true)
        })

        const newMember = dao_contract.filters.NewMemberAdded(null)

        dao_contract.on(newMember, (member, event) => {
            console.log('NewMemberAdded|member', { member, event })
            // mutateFee(undefined, true)
        })

        // remove listener when the component is unmounted
        return () => {
            dao_contract.removeAllListeners(feeChanged)
        }

        // trigger the effect only on component mount
    }, [isActive, account, provider])


    return (
        <>
            <p>DAO address: {dao_address.substr(0, 8) + '...' + dao_address.substr(36)}</p>
            <p>DAO status: {isPause}</p>
            <p>DAO fee for vote: {fee}</p>
        </>
    );
}

export default function Metainfo() {

    return (
        <div>

            <CustomDivider title="Token" padding="5" />
            <InfoAboutToken />
            <CustomDivider title="DAO Info" padding="5" />
            <InfoAboutDAO />

        </div>

    );
}