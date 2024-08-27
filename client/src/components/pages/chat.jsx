import { useContext } from "react";
import { ChatContext } from "/src/context/ChatContext.jsx";
import { Container, Stack } from "react-bootstrap";
import { UserChat } from "/src/chats/UserChat.jsx";
import { AuthContext } from "/src/context/AuthContext.jsx";
import {PotentialChats} from "/src/chats/PotentialChat.jsx"
import { ChatBox } from "/src/chats/ChatBox.jsx";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    userChats,
    isUserChatsLoading,
    updateCurrentChat
  } = useContext(ChatContext);
  console.log('user chats',userChats);
  return (
    <Container>
     <PotentialChats/>
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="message-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={()=> updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
