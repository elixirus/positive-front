import { Container, Divider, Heading } from '@chakra-ui/react';
import BlogInfo from './BlogInfo';
import ArticleShort from './ArticleShort';
import { CustomDivider } from '../CustomDivider/CustomDivider';
import articles from "../../db/blog/articles_list.json";

const ArticleList = () => {

  const articles_render = articles.map((a: any) => {
    return <div key={a.date}>
      <ArticleShort props={{
        article_id: a.article_id,
        tags: a.tags,
        blog_title: a.blog_title,
        blog_image: a.blog_image,
        short: a.short,
        author_name: a.author,
        date: a.date,
        image: a.author_image,
      }} />
      <CustomDivider padding="10" />
    </div>
  })


  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">Stories by Positive | Web3 Security</Heading>
      <Divider marginTop="10" />

      {articles_render}

      {/* TODO: <BlogInfo /> */}
    </Container>
  );
};

export default ArticleList;