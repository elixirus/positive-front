import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Select,
} from '@chakra-ui/react';
import { ethers } from 'ethers';

import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { Contract } from "@ethersproject/contracts";
import { dao_address } from '../../db/ctf/addresses'
import dao_abi from "../../db/PositiveDAO.json"
// import { Calendar, CalendarControls, CalendarDays, CalendarMonth, CalendarMonthName, CalendarMonths, CalendarNextButton, CalendarPrevButton, CalendarWeek } from '@uselessdev/datepicker';

export default function CreateTask() {

    const { account, isActive, provider } = useWeb3React()
    const dao_contract: Contract = new Contract(dao_address, dao_abi.abi, provider);

    // const [dates, setDates] = useState()
    // const handleSelectDate = (values) => setDates(values)

    const [task_name, setName] = useState('')
    const handleNameChange = (e) => setName(e.target.value)

    const [task_type, setType] = useState('')
    const handleTypeChange = (e) => setType(e.target.value)

    const [task_deadline, setDeadline] = useState('')
    const handleDeadlineChange = (e) => setDeadline(e.target.value)

    const [task_price, setPrice] = useState('')
    const handlePriceChange = (e) => setPrice(e.target.value)

    const isErrorName = task_name === ''
    const isErrorDeadline = task_deadline === ''
    const isErrorPrice = task_price === ''


    const toHex = (text: string) => {
        return ethers.encodeBytes32String(text); //.utils.formatBytes32String(text)
    }

    // function wrapHex(hex: string) {
    //     return ethers.toUtf8String(ethers.hexlify(hex))
    //     // return ethers.utils.parseBytes32String(ethers.utils.hexlify(hex))
    // }

    const handleClick = () => {
        if (!(isActive && account && provider)) return

        provider?.getCode(dao_address).then((result: string) => {
            //check whether it is a contract
            if (result === '0x') return

            const connectedContract = dao_contract.connect(provider.getSigner())

            let taskName = toHex(task_name);
            let taskType = toHex(task_type);
            let taskDeadline = toHex(task_deadline);
            let taskPrice = task_price;
            let taskCategory = toHex(task_type);
            let taskThreshold = 0;

            console.log(taskName)
            console.log(taskType)
            console.log(taskDeadline)
            console.log(taskPrice)
            console.log(taskCategory)
            console.log(taskThreshold)

          connectedContract.createTask(taskName, taskType, taskDeadline, taskPrice, taskCategory, taskThreshold).then((result: string) => {
                console.log("createTask result: ", result)
            }).catch((error: any) => {
                console.log("createTask error: ", error)
            })

            // console.log("createTask res: ", res);
        })
    }

    // заполнить форму и вызвать функцию createTask
    return (
        <>
            {/* <FormControl isInvalid={!isError} isRequired> */}
            <FormControl isInvalid={!isErrorName} isRequired>
                <FormLabel>Название</FormLabel>
                <Input type='text' value={task_name} onChange={handleNameChange} />
                {!isErrorName ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>

            <FormControl>
                <FormLabel>Тип</FormLabel>
                <Select placeholder='Выберите тип' onChange={handleTypeChange}>
                    <option>Исследование</option>
                    <option>Код</option>
                    <option>Домашнее задание</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Категория</FormLabel>
                <Select placeholder='Select country'>
                    <option>Web3</option>
                    <option>Криптография</option>
                </Select>
            </FormControl>

            <FormControl isInvalid={!isErrorDeadline} isRequired>
                <FormLabel>Срок</FormLabel>
                <Input type='text' value={task_deadline} onChange={handleDeadlineChange} />
                {!isErrorDeadline ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>

            {/* <ChakraProvider theme={CalendarDefaultTheme}> */}
            {/* <Calendar value={dates} onSelectDate={handleSelectDate}>
                <CalendarControls>
                    <CalendarPrevButton />
                    <CalendarNextButton />
                </CalendarControls>

                <CalendarMonths>
                    <CalendarMonth>
                        <CalendarMonthName />
                        <CalendarWeek />
                        <CalendarDays />
                    </CalendarMonth>
                </CalendarMonths>
            </Calendar> */}
            {/* </ChakraProvider> */}


            <FormControl isInvalid={!isErrorPrice} isRequired>
                <FormLabel>Стоимость</FormLabel>
                <Input type='text' value={task_price} onChange={handlePriceChange} />
                {!isErrorPrice ? (
                    <FormHelperText>
                        Enter the email you'd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
            </FormControl>

            <Button colorScheme='red' onClick={() => handleClick()} width={'sm'}>Add idea</Button>
        </>
    )
}
