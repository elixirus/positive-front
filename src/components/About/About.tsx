// import Head from 'next/head';
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Flex,
    chakra,
    Image,
    VStack,
    SimpleGrid,
    StackDivider,
    VisuallyHidden,
    List,
    ListItem,
    HStack,
} from '@chakra-ui/react';

export default function About() {
    return (

        <Container maxW={'3xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
            >
                <Stack
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>

                    <p>Our company provides web3 security services for blockchain applications and smart contracts.</p>
                    <p>We offer a full range of services, including security audits, development and implementation of protection measures, risk monitoring and analysis, and security consulting.</p>
                </Stack>
            </Stack>
        </Container>

    );
}