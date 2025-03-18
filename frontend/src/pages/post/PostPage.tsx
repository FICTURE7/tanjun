import { useParams } from "react-router";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import PostHeader from "./components/PostHeader";
import PostBody from "./components/PostBody";
import PostFooter from "./components/PostFooter";
import Avatar from "../../components/Avatar";

const PostPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Container>
      <PostHeader title={`post ${id}`} />
      <Card>
        <PostBody>
          <p>
            {id}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </PostBody>
        <PostFooter name={"username"} src={"https://placehold.co/150"} />
      </Card>

      <div style={{marginBottom: "1rem", marginTop: "5rem"}}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src='https://placehold.co/150' />
            <div style={{ marginLeft: '1rem' }}>
              <h3 style={{ margin: '0', fontSize: '0.9rem' }}>username</h3>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>some comment</p>
            </div>
          </div>
        </Card>
      </div>

      <div style={{marginBottom: "1rem"}}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src='https://placehold.co/150' />
            <div style={{ marginLeft: '1rem' }}>
              <h3 style={{ margin: '0', fontSize: '0.9rem' }}>username</h3>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>some comment</p>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </Container>
  );
}

export default PostPage;
