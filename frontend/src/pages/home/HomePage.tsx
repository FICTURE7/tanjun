import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import PostPreviewList from "./components/PostPreviewList";
import './HomePage.css'

// TODO: Fetch this from the API.
const posts = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'test'
    },
    title: "Post 1",
    content: "This is the first post. It contains some additional dummy content to make it more descriptive.",
    created_at: new Date(),
    updated_at: new Date(),
    comments: []
  },
  {
    id: 2,
    author: {
      id: 1,
      username: 'test'
    },
    title: "Post 2",
    content: "This is the second post. Here's some more dummy content to make it stand out.",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    author: {
      id: 1,
      username: 'test'
    },
    title: "Post 3",
    content: "This is the third post. Adding some extra dummy content to make it more engaging.",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <PostPreviewList posts={posts} />
      <Footer />
    </Container>
  )
}

export default Home;
