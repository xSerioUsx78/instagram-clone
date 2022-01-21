import { Link } from 'react-router-dom';
import { ChevronDownIcon, PencilAltIcon } from '@heroicons/react/outline';

const Header = () => {
  return (
    <div className="flex p-4 items-center justify-between border-b">
      <div></div>
      <div className="flex items-center cursor-pointer">
        <h2 className="font-medium mr-1.5">
          imortezaw_
        </h2>
        <ChevronDownIcon width={20} height={20} />
      </div>
      <div>
        <Link to="">
          <PencilAltIcon width={30} height={30} />
        </Link>
      </div>
    </div>
  )
}

export default Header
