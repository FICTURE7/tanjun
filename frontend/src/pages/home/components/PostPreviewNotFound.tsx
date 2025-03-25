import { BsSearch } from "react-icons/bs";
import { Card } from "../../../components";

const PostPreviewNotFound: React.FC = () => {
  return (
    <Card>
      <div className="text-center">
        <p className='font-bold text-2xl mb-6'>
          not found
        </p>

        <div className="mb-6">
          <BsSearch className='inline' fontSize='8rem' />
        </div>

        <p>Looks like there are no posts with that title.</p>
      </div>
    </Card>
  )
}

export default PostPreviewNotFound;
