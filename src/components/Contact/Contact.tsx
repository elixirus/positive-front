import {
  Container,
  Box,
  Stack,
} from '@chakra-ui/react';
// import {
//   MdPhone,
//   MdEmail,
//   MdLocationOn,
//   MdFacebook,
//   MdOutlineEmail,
// } from 'react-icons/md';
// import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

export default function contact() {
  return (

    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
      >
        <p>Contact us to learn more about our services and get advice from experienced specialists. We guarantee high quality of work and individual approach to each client.</p>

        {/* <Box>
          <Box m={8} color="#0B0E3F">
            <VStack spacing={5}>
              <FormControl id="name">
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<BsPerson color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                </InputGroup>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Mail</FormLabel>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdOutlineEmail color="gray.800" />}
                  />
                  <Input type="text" size="md" />
                </InputGroup>
              </FormControl>
              <FormControl id="name">
                <FormLabel>Message</FormLabel>
                <Textarea
                  borderColor="gray.300"
                  _hover={{
                    borderRadius: 'gray.300',
                  }}
                  placeholder="message"
                />
              </FormControl>
              <FormControl id="name" float="right">

                <Button
                  variant="solid"
                  bg="#0D74FF"
                  color="white"
                  _hover={{}}>
                  <a href="mailto:email@example.com?subject='Hello from Abstract!'&body='Just popped in to say hello'">Send Message</a>

                </Button>

              </FormControl>
            </VStack>
          </Box>
        </Box> */}
      </Stack>
    </Container>
  );
}