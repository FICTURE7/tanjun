import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router"

import './ToolbarCreateButton.css'

const ToolbarCreateButton: React.FC = () => {
  return (
    <div>
      <Link to='/post-create'>
        <button className='create-button'>
          <BsPlusLg fontSize='2rem' />
        </button>
      </Link>
    </div>
  )
}

export default ToolbarCreateButton;
