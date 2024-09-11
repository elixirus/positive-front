import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    HStack,
    Tag,
    SpaceProps,
    useColorModeValue,
} from '@chakra-ui/react';

interface IBlogTags {
    tags: Array<string>;
    marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
    return (
        <HStack spacing={2} marginTop={props.marginTop}>
            {props.tags.map((tag) => {
                return (
                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                        {tag}
                    </Tag>
                );
            })}
        </HStack>
    );
};

interface BlogAuthorProps {
    date: Date;
    name: string;
    image: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image
                borderRadius="full"
                boxSize="40px"
                src={props.image}
                alt={`Avatar of ${props.name}`}
            />
            <Text fontWeight="medium">{props.name}</Text>
            <Text>—</Text>
            <Text>{props.date.toLocaleDateString()}</Text>
        </HStack>
    );
};

const ArticleShort = (props: any) => {
    const [blog_image, setImage] = useState();


    // useEffect(() => {
    //     const loadContents = async () => {
    //         try {
    //             console.log("props.props.blog_image: ", props.props.blog_image);

    //             const blog_image = await import(`../../images/articles/${props.props.blog_image}.jpg`);
    //             console.log("blog_image: ", blog_image);

    //             setImage(blog_image);
    //         } catch (e) {
    //             console.error("Error loading content: ", e);
    //         }
    //     };

    //     loadContents();
    // }, []);



    return (
        <Box
            marginTop={{ base: '1', sm: '5' }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            justifyContent="space-between">
            <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center">
                <Box
                    width={{ base: '100%', sm: '85%' }}
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="5%">
                    <Link textDecoration="underline" _hover={{ textDecoration: 'none' }}>
                        <Image
                            // borderRadius="lg"
                            src={props.props.blog_image}
                            alt={props.props.blog_title}
                        // objectFit="contain"
                        />
                    </Link>
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                        bgGradient={useColorModeValue(
                            'radial(orange.600 1px, transparent 1px)',
                            'radial(orange.300 1px, transparent 1px)'
                        )}
                        backgroundSize="20px 20px"
                        opacity="0.4"
                        height="100%"
                    />
                </Box>
            </Box>
            <Box
                display="flex"
                flex="1"
                flexDirection="column"
                justifyContent="center"
                marginTop={{ base: '3', sm: '0' }}>
                <BlogTags tags={props.props.tags} />
                <Heading marginTop="1">
                    <Link textDecoration="underline" _hover={{ textDecoration: 'none' }} href={`blog/${props.props.article_id}`} >
                        {props.props.blog_title}
                    </Link>
                </Heading>
                <Text
                    as="p"
                    marginTop="2"
                    color={useColorModeValue('gray.700', 'gray.200')}
                    fontSize="lg">
                    {props.props.short}
                </Text>
                <BlogAuthor name={props.props.author_name} date={new Date(props.props.date)} image={props.props.image} />
            </Box>
        </Box>
    );
};

export default ArticleShort;