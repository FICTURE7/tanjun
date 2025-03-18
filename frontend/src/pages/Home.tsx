import Post from "../components/Post"

const Home: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: {
        id: 1,
        name: 'test'
      },
      title: "Post 1",
      content: "This is the first post",
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
      content: "This is the second post",
      created_at: new Date(),
      updated_at: new Date(),
      comments: []
    },
  ];

  return (
    <div>
      <h1>blog</h1>

      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Home;
