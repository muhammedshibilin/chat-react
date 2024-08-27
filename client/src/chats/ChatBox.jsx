import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "/src/context/AuthContext.jsx";
import { ChatContext } from "/src/context/ChatContext.jsx";
import { useFetchRecipientUser } from "/src/hooks/useFetchRecipient.js";
import { Stack, Button, Modal, Form } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";


const NoChatSelected = ({ onChatSelected }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
      <Stack gap={4} className="chat-box text-center">
          <div className="chat-header">
              <strong>No chats selected</strong>
          </div>
          <div className="select-chat">
              <Button variant="primary" onClick={handleOpenModal}>
                  Select Chat
              </Button>
          </div>

          {/* Modal for selecting chats */}
          <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                  <Modal.Title>Select a Chat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group controlId="searchInput">
                          <Form.Label>Search Chats</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Enter chat name..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                          />
                      </Form.Group>
                      {/* You can add more content or a list of search results here */}
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={handleCloseModal}>
                      Select
                  </Button>
              </Modal.Footer>
          </Modal>
      </Stack>
  );
};

export const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading,sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect( () => {
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages]) 

  if (!currentChat) {
    return <NoChatSelected />
  }

  if (isMessagesLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chats...</p>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message self align-self-start flex-grow-0"
              }`}
              ref = {scroll}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        <button className="send-btn" onClick={() => sendTextMessage(textMessage,user,currentChat._id,setTextMessage)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg>
        </button>
      </Stack>
    </Stack>
  );
};
