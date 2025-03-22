import Button from "../../components/Button";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TextArea from "../../components/TextArea";
import TextField from "../../components/TextField";

const PostCreatePage: React.FC = () => {
  return (
    <Container>
      <Header />

      <Card>
        <CardHeader 
          title="Create Post"
          description="Create some new content for the blog."/>

        <form>
          <div className="mb-6">
            <TextField
              label="title"
              helperLabel="The title of your blog post."
              required />
          </div>

          <div className="mb-6">
            <TextArea
              label="Content"
              helperLabel="The content of your blog post."
              required />
          </div>

          <div>
            <div className="inline mr-2">
              <Button
                type="submit"
                label="Create" />
            </div>
            <div className="inline">
              <Button
                type="button"
                label="Cancel"
                variant="secondary" />
            </div>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  )
}

export default PostCreatePage;
