import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ChatContext } from "/src/context/ChatContext.jsx";


export const UserChat = ({ chat, user }) => {
    const {recipientUser} = useFetchRecipientUser(chat, user);
    const {onlineUsers} = useContext(ChatContext)

    const isOnline =   onlineUsers?.some((user) => user?.userId === recipientUser?._id)
    return <Stack direction="horizontal" gap={4} className="user-card justify-content-between p-2 " role="button">
        <div className="d-flex">
            <div className="me-2">
                <img src="/src/assets/avatar.svg" alt="profile" height="40px" />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">text mesage</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                12/02/24
            </div>
            <div className="this-user-notifications">
                2
            </div>
            <span className={isOnline?"user-online":""}></span>
        </div>
    </Stack>;
};


UserChat.propTypes = {
    chat: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};
