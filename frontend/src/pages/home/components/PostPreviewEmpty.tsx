import { BsBoxSeam } from "react-icons/bs";
import Card from "../../../components/Card";

const PostPreviewEmpty: React.FC = () => {
  return (
    <Card>
      <div className="text-center">
        <h2 className='mb-4'>
          empty
        </h2>

        <div className="mb-4">
          <BsBoxSeam fontSize='8rem' />
        </div>

        <p>Looks like there are no posts. Lets go create some!</p>
      </div>
    </Card>
  )
}

export default PostPreviewEmpty;
