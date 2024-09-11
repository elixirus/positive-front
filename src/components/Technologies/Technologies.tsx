import {
    Box,
    Container,
    Stack,
    Flex,
    Image,
    HStack,
} from '@chakra-ui/react';
import fabric from '../../images/fabric.png';
import eth from '../../images/eth.png';
import ton from '../../images/ton.png';
import tron from '../../images/tron.png';


export default function Technologies() {

    return (

        <Container maxW={'3xl'}>
            <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
            >
                {/* <p>We utilize the latest technologies and methods to ensure the security of your projects.</p> */}

                <HStack
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>

                    <Flex>
                        <Image
                            // rounded={'md'}
                            alt={'hyperledger fabric projects security audit'}
                            src={fabric}
                            // fit={'cover'}
                            // align={'center'}
                            // w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '100px' }}
                        />
                    </Flex>

                    <Flex>
                        <Image
                            // rounded={'md'}
                            alt={'ethereum projects security audit'}
                            src={eth}
                            // fit={'cover'}
                            // align={'center'}
                            // w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '100px' }}
                        />
                    </Flex>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'ton projects security audit'}
                            src={ton}
                            // fit={'cover'}
                            // align={'center'}
                            // w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '90px' }}
                        />
                    </Flex>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'tron projects security audit'}
                            src={tron}
                            // fit={'cover'}
                            // align={'center'}
                            // w={'100%'}
                            h={{ base: '25%', sm: '50px', lg: '80px' }}
                        />
                    </Flex>
                </HStack>
            </Stack>
        </Container>

    );
}