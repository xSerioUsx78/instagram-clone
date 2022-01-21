import { Link } from "react-router-dom";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import styles from '../../styles/direct/inbox.module.css';

const SendMessage = () => {
  return (
    <div className={`${styles.wrapper} flex items-center justify-center flex-col h-full w-full`}>
      <div className="p6 w-24 h-24 rounded-full border-2 border-gray-900 mb-3 flex items-center justify-center">
        <PaperAirplaneIcon width={50} height={50} className="transform rotate-45" />
      </div>
      <div className="text-center">
        <div className="mb-6">
          <h3 className="text-xl font-light">
            Your Messages
          </h3>
          <span className="text-gray-400 text-sm">
            Send private photos and messages to a friend or group.
          </span>
        </div>
        <Link to="" className="px-2 py-1.5 rounded text-sm font-medium 
                  rounded text-white bg-blue-500 focus:bg-blue-400">
          Send Message
        </Link>
      </div>
    </div>
  )
}

export default SendMessage
