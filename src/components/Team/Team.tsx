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

export default function Team() {
    return (

        <Container maxW={'3xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
            >
                <p>Our team of experts has extensive experience with blockchains and smart contracts, which allows us to quickly and efficiently solve any problem.</p>

                <HStack
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>

                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                'https://www.fabricgateway.com/images/fabricgateway/61/6158aaa9183c37a03477309822af3d16.png'
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '100px' }}
                        />
                    </Flex>

                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                'https://www.vhv.rs/file/max/30/305014_ethereum-logo-png.png'
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '100px' }}
                        />
                    </Flex>
                </HStack>
            </Stack>
        </Container>

    );
}