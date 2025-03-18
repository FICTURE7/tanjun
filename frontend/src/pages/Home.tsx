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

const Header: React.FC = () => {
  return (<h1 className='title'>tanjun</h1>);
}

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <p className='tanjun'>tanjun</p>
      <ul className='footer-links'>
        <li><a href='/about'>About Us</a></li>
        <li><a href='/contact'>Contact</a></li>
        <li><a href='/privacy'>Privacy Policy</a></li>
        <li><a href='/terms'>Terms of Service</a></li>
      </ul>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <Header />

      {/* TODO: Create a PostCardList component. */}
      <ul className='post-list'>
        {posts.map(post => <li><Post key={post.id} post={post} /></li>)}
      </ul>

      <Footer />
    </>
  )
}

export default Home;
