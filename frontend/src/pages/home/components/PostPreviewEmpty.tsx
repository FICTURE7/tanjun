import Card from "../../../components/Card";

const PostPreviewEmpty: React.FC = () => {
  return (
    <Card>
      <div className="text-center">
        <h2>empty</h2>
        <p>Looks like there are no posts. Lets go create some!</p>
      </div>
    </Card>
  )
}

export default PostPreviewEmpty;
