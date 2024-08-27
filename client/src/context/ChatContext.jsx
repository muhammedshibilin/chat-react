import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import PropTypes from "prop-types";
import {io} from 'socket.io-client'


export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat,setCurrentChat] = useState(null)
  const [messages,setMessages] = useState(null)
  const [isMessagesLoading,setIsMessagesLoading] = useState(false)
  const [messagesError,setMessagesError] = useState(null)
  const [sendTextMessageError,setSendTextMessageError] = useState(null)
  const [newMessage,setNewMessage] = useState(null)
  const [socket,setSocket] = useState(null)
  const [onlineUsers,setOnlineUsers] = useState(null)
  const [notification,setNotification] = useState([])
  const [allUsers,setAllUsers] = useState(null)
 
  
  
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5
    });
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setSocket(newSocket);
    });
  
    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if(socket==null) return
    console.log(user)
    socket.emit("addNewUser",user?._id)
    socket.on("getOnlineUsers",(res) => {
      setOnlineUsers(res)
    })
    return () => {
      socket.off("getOnlineUsers")
    }
  },[socket])

  // send message

  useEffect(() => {
    if(socket===null) return
    const recipientId = currentChat?.members?.find(id => id !== user?._id);
    socket.emit("sendMessage",{...newMessage,recipientId})
  },[newMessage])

  //recieve message && recieve notifiction
  useEffect(() => {
    if(socket === null) return;
  
    socket.on("getMessage", res => {
      if(currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
  
    socket.on("getNotification", (res) => {
      // Check if the chat related to the notification is open
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
      
      // If the chat is open, mark the notification as read, else add it as unread
      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });
  
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);
  
  
  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        try {
          const response = await getRequest(`${baseUrl}/chat/${user._id}`);
          setIsUserChatsLoading(false);
          if (response.error) {
            setUserChatsError(response.message);
          } else {
            console.log('Fetched user chats:', response);
            setUserChats(response);
          }
        } catch (error) {
          setIsUserChatsLoading(false);
          setUserChatsError(error.message);
        }
      }
    };
    getUserChats();
  }, [user]);
  


  useEffect(() => {
    const getMessages = async () => {
      if (user?._id) {
        setIsMessagesLoading(true);
        setMessagesError(null);
        try {
          const response = await getRequest(`${baseUrl}/message/${currentChat?._id}`);
          setIsMessagesLoading(false);
          if (response.error) {
            setMessagesError(response.message);
          } else {
            setMessages(response);
          }
        } catch (error) {
          setIsMessagesLoading(false);
          setMessagesError(error.message);
        }
      }
    };
    getMessages();
  },[currentChat]);

  const sendTextMessage = useCallback(async(textMessage,sender,currentChatId,setTextMessage) => {
    if(!textMessage) return console.log('you must type something..');

    const response = await postRequest(`${baseUrl}/message`,JSON.stringify({chatId:currentChatId,
      senderId:sender._id,
      text:textMessage
    }))

    if(response.error){
      return setSendTextMessageError(response)
    }

    setNewMessage(response)
    setMessages((prev) => [...prev,response])
    setTextMessage("")
     
  },[setMessages])


  useEffect(() => {
    const getUsers = async () => {
      if (userChats && userChats.length > 0) { 
        console.log('Fetching users because userChats has', userChats.length, 'items.');
        const response = await getRequest(`${baseUrl}/users`);
        if (response.error) {
          return console.log('Error finding users:', response.message);
        }
  
        const pChats = response.filter(u => {
          let isChatCreated = false;
  
          if (user?._id === u._id) return false;
          if (userChats) {
            isChatCreated = userChats?.some(chat => {
              return chat.members[0] === u._id || chat.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
  
        console.log('Potential chats:', pChats);
        setPotentialChats(pChats);
        setAllUsers(response)

      } else {
        console.log('Not fetching users because userChats is empty or undefined.');
      }
    };
    getUsers();
  }, [userChats, user]);
  

  const updateCurrentChat = useCallback((chat) => {
    console.log('updateCurrentChat called with chat:', chat);
    setCurrentChat(chat);
  },[setCurrentChat]);

  const createChat = useCallback( async (firstId,secondId) => {
    const response = await postRequest(
      `${baseUrl}/chat`,
      JSON.stringify({
        firstId,
        secondId
      })
    )
    if(response.error){
      return console.log("error in creating chat ",response)
    }

    setUserChats((prev) => [...prev,response])
  },[])

  return (
    <ChatContext.Provider
      value={{
          
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        sendTextMessage,
        messages, 
        isMessagesLoading,
        messagesError,
        sendTextMessageError,
        newMessage,
        onlineUsers,
        notification,
        allUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};



ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired,
};

