import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import PostPreviewList from "./components/PostPreviewList";

import usePostListQuery from "../../hooks/usePostListQuery";

const Home: React.FC = () => {
  const { data: posts } = usePostListQuery();

  return (
    <Container>
      <Header />

      <PostPreviewList posts={posts} />

      <Footer />
    </Container>
  )
}

export default Home;
