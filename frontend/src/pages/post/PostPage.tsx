import { useParams } from "react-router";
import Container from "../../components/Container";
import Card from "../../components/Card";

const PostPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Container>
      <h1>Hello world!</h1>
      <Card>
        <p>Got the {id} parameter!</p>
      </Card>
    </Container>
  );
}

export default PostPage;
