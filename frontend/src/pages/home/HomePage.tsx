import { useState } from "react";

import { Container, Footer, Header } from "../../components";
import { usePostListQuery } from "../../hooks";

import Toolbar from "./components/Toolbar";
import PostPreviewList from "./components/PostPreviewList";

const Home: React.FC = () => {
  const { data: posts } = usePostListQuery();
  const [search, setSearch] = useState('')

  function handleSearch(value: string): void {
    setSearch(value);
  }

  return (
    <Container>
      <Header size="large" />

      <div className="mb-8">
        <Toolbar onSearch={handleSearch}/>
      </div>

      <div>
        <PostPreviewList posts={posts} filter={search} />
      </div>

      <Footer />
    </Container>
  )
}

export default Home;
