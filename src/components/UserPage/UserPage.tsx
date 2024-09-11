// import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import EventList from '../CTF/EventList';
import { useEffect, useState } from 'react';
import { EventLog, Log } from 'ethers';
import addresses from '../../db/ctf_address.json';
import {
    getLevelInstanceCreatedLogByPlayerAndLevel
} from '../../utils/ctf.utils';
export default function UserPage() {

    const { t } = useTranslation();
    const { id } = useParams();
    const { account, isActive, provider } = useWeb3React()
    const location = useLocation();
    const [eventsCreatedInstanse, setEventsCreatedInstanse] = useState<(EventLog | Log)[]>([])
    const [challenageAddress, setChallenageAddress] = useState<string>("")


    useEffect(() => {
       console.log("id: ", id)

        // if (!(isActive && account && provider)) return
        // provider?.getCode(addresses.positiveCTF).then((result: string) => {
        //     //check whether it is a contract
        //     if (result === '0x') return
        // })

        // getLevelInstanceCreatedLogByPlayerAndLevel(account, challenageAddress, provider)
        //     .then((result: any) => { setEventsCreatedInstanse(result) })
        //     .catch('error', console.error)
    }, [location.pathname, isActive, account, provider])

    return (

        <Container maxW={'7xl'}>

            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 6, md: 12 }}
                py={{ base: 18, md: 18 }}>
                <EventList events={eventsCreatedInstanse} />

            </Stack>

        </Container>

    );
}