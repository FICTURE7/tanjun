import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import Button from "../../components/Button";
import TextArea from "../../components/TextArea";
import TextField from "../../components/TextField";

const PostEditPage: React.FC = () => {
  return (
    <Container>
      <Header size="large" />

      <Card>
        <CardHeader 
          title="Edit Post"
          description="Edit some old content for the blog."/>

        <form>
          <div className="mb-6">
            <TextField
              label="title"
              helperLabel="The new title of the blog post."
              required />
          </div>

          <div className="mb-6">
            <TextArea
              label="Content"
              helperLabel="The new content of the blog post."
              required />
          </div>

          <div>
            <div className="inline mr-2">
              <Button
                type="submit"
                label="Edit" />
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

export default PostEditPage;
