import { useParams } from "react-router";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Post from "./components/Post";
import PostNotFound from "./components/PostNotFound";

import usePostQuery from "../../hooks/usePostQuery";

const PostPage: React.FC = () => {
  const { id } = useParams();

  let body = undefined;

  if (id) {
    const { data } = usePostQuery({ id: parseInt(id) });

    if (data) {
      body = <Post post={data} />
    }
  }

  return (
    <Container>
      <Header size="normal"/>

      {body ?? <PostNotFound />}

      <Footer />
    </Container>
  );
}

export default PostPage;
