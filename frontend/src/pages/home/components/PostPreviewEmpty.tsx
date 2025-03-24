import { BsBoxSeam } from "react-icons/bs";
import { Card } from "../../../components";

const PostPreviewEmpty: React.FC = () => {
  return (
    <Card>
      <div className="text-center">
        <p className='font-bold text-2xl mb-6'>
          empty
        </p>

        <div className="mb-6">
          <BsBoxSeam className='inline' fontSize='8rem' />
        </div>

        <p>Looks like there are no posts. Lets go create some!</p>
      </div>
    </Card>
  )
}

export default PostPreviewEmpty;
