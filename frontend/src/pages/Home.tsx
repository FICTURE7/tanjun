import Post from "../components/PostCard"
import './Home.css'

// TODO: Fetch this from the API.
const posts = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'test'
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
      name: 'test'
    },
    title: "Post 2",
    content: "This is the second post. Here's some more dummy content to make it stand out.",
    created_at: new Date(),
    updated_at: new Date(),
    comments: []
  },
  {
    id: 3,
    author: {
      id: 1,
      name: 'test'
    },
    title: "Post 3",
    content: "This is the third post. Adding some extra dummy content to make it more engaging.",
    created_at: new Date(),
    updated_at: new Date(),
    comments: []
  },
];

const Home: React.FC = () => {
  return (
    <div>
      <h1 className='title'>tanjun</h1>

      <ul className='post-list'>
        {posts.map(post => <li><Post key={post.id} post={post} /></li>)}
      </ul>
    </div>
  )
}

export default Home;
