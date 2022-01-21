import ChatList from "./ChatList";
import Header from "./Header";
import SendMessage from "./SendMessage";

const Inbox = () => {
  return (
    <div className={"bg-white border rounded"}>
      <div className="flex flex-row">
        <div className="w-full md:w-1/3 h-full border-r">
          <div>
            <Header />
            <ChatList />
          </div>
        </div>
        <div className="w-full md:w-2/3 h-full">
          <SendMessage />
        </div>
      </div>
    </div>
  )
};

export default Inbox;