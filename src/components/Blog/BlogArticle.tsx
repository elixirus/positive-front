import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Image,
  useColorModeValue,
  useToast,
  VStack,
  Avatar,
  Divider,
  extendTheme,
  SpaceProps,
  HStack,
  Tag,
  Center,
  ListIcon,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import articles from "../../db/blog/articles_list.json";
import { MdCheckCircle, MdLocalShipping } from 'react-icons/md'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import { CustomDivider } from '../CustomDivider/CustomDivider';

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
  margin?: SpaceProps['margin'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <Center margin={props.margin}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag} margin={1}>
            {tag}
          </Tag>
        );
      })}
    </Center>
  );
};

const BlogArticle = (props: any) => {

  const { t } = useTranslation();
  const { id } = useParams();
  const { account, isActive, provider } = useWeb3React();
  const location = useLocation();
  const [author, setAuthor] = useState<string[]>(["anon"]);
  const [authorImage, setAuthorImage] = useState<string>("");
  const [authorRole, setAuthorRole] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [short, setShort] = useState<string>("");
  const [blogImage, setBlogImage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [blogBody, setBlogBody] = useState<any>();

  const [loading, setLoading] = useState<boolean>(false);

  // const { addresses, setAddresses } = useContext(AddressContext);
  const toast = useToast();

  useEffect(() => {

    const article = () => articles.map((a: any) => {
      if (a.article_id == id) {
        setAuthor(a.author)
        setAuthorImage(a.author_image)
        setAuthorRole(a.author_role)
        setTags(a.tags)
        setBlogTitle(a.blog_title)
        setShort(a.short)
        setBlogImage(a.blog_image)
        setDate(a.date)
        setBlogBody(a.blog_body)
      }
    });

    article();
  }, [
    location.pathname,
    isActive,
    account,
    provider,
    blogTitle,
    loading,
  ]);

  return (

    <Container maxW={'7xl'} p="12">
      <center><Heading as="h1">{blogTitle}</Heading></center>
      <center><BlogTags tags={tags} margin={5} /></center>
      <center>{date}</center>

      <Divider marginTop="5" />
      <Stack
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={16}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={'center'}
        direction={'column'}>
        <Text fontSize={{ base: 'xl', md: '2xl' }} textAlign={'center'} maxW={'3xl'}>
          {short}
        </Text>
        <Box textAlign={'center'}>
          <Avatar
            src={
              authorImage
            }
            mb={2}
          />

          <Text fontWeight={600}>{author}</Text>
          <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
            {authorRole}
          </Text>
        </Box>
      </Stack>

      {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}

      {/* <div dangerouslySetInnerHTML={{ __html: blogBody }} /> */}

      <Stack spacing={3}>
        <CustomDivider padding="10" title="Introduction" />
        <Text>
          Smart contracts are autonomous programmes that automatically perform certain actions under certain conditions. In the TON (Telegram Open Network) blockchain, smart contracts are used to manage and protect digital assets. The security of smart contracts in TON is a key aspect, as improper implementation can lead to loss of funds and other undesirable consequences. In this article, we will look at the main aspects of smart contract security in TON.
        </Text>
        <CustomDivider padding="10" title="Features of smart contracts in TON" />
        <Text>
          TON is a blockchain platform that uses smart contracts to manage digital assets. Key features of smart contracts in TON include:
        </Text>
        <List spacing={3}>
          <ListItem>
            <Text>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Autonomy: Smart contracts in TON are autonomous and perform certain actions on their own when certain conditions are met.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Security: TON provides a high level of security for smart contracts, protecting them from attacks and unauthorised access.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Scalability: TON can handle a large number of transactions per second, making it ideal for smart contracts.
            </Text>
          </ListItem>
        </List>
        <CustomDivider padding="10" title="Security of smart contracts in TON" />
        <Text>
          To ensure the security of smart contracts in TON, developers should pay attention to the following aspects:
        </Text>
        <List spacing={1}>
          <Text>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Code auditing: Before a smart contract is deployed, its code should be audited to ensure that it is written securely and reliably.This can be done by independent experts or by the developer community.
            </ListItem>
          </Text>
          <Text>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Access Restriction: Access to smart contracts should be restricted to only those who should have access.This can be achieved through authorisation and authentication mechanisms.
            </ListItem>
          </Text>
          <Text>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Data security: Data stored in smart contracts should be protected from unauthorised access and modification.This can be achieved through encryption and other cryptographic methods.
            </ListItem>
          </Text>
          <Text>
            <ListItem>
              <ListIcon as={MdCheckCircle} color='green.500' />
              Transaction atomicity: Transactions in smart contracts must be atomic, i.e.either fully executed or not executed at all.This ensures that the smart contract is in a consistent state.
            </ListItem>
          </Text>
        </List>
        <CustomDivider padding="10" title="Conclusion" />
        <Text>
          The security of smart contracts in the TON blockchain is key to ensuring the stability and reliability of the platform.Developers should carefully consult and audit the code, ensure access restriction, data security and transaction atomicity.By following these guidelines, it is possible to create reliable and secure smart contracts in TON.
        </Text>
      </Stack>

    </Container >

  );
};

export default BlogArticle;