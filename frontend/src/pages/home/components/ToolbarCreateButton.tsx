import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router"

const ToolbarCreateButton: React.FC = () => {
  return (
    <div>
      <Link to='/post/new'>
        <button className='h-16 w-16 bg-black hover:bg-gray-800 active:bg-gray-700 text-white rounded-full cursor-pointer'>
          <BsPlusLg className='inline text-2xl' />
        </button>
      </Link>
    </div>
  )
}

export default ToolbarCreateButton;
