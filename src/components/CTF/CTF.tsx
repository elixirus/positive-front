// import Head from 'next/head';
import {
    Box,
    Container,
    Divider,
    Heading, Stack, Text
} from '@chakra-ui/react';
import Challenges from './Challenges';

export default function CTF() {

    return (
        <Container maxW={'7xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 6, md: 12 }}
                py={{ base: 18, md: 18 }}>
                <Heading
                    lineHeight={'120%'}>
                    <br />
                    <Text color={'red'}>
                        Challanges
                    </Text>

                </Heading>
                <Challenges />
                
            </Stack>
        </Container>
    );
}