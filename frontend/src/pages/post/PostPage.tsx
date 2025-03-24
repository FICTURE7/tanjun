import { useParams } from "react-router";

import { usePostQuery, useAuth } from "../../hooks";
import { Container, Footer, Header } from "../../components";

import Post from "./components/Post";
import PostNotFound from "./components/PostNotFound";

const PostPage: React.FC = () => {
  const { id } = useParams();
  const auth = useAuth();

  let body = undefined;

  if (id) {
    const { data } = usePostQuery({ id: parseInt(id) });

    if (data) {
      body = <Post post={data} editable={auth?.user.id === data.author.id} />
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
