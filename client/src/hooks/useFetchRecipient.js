import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    console.log('useFetchRecipientUser:', { chat, user });
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.filter(id => id !== user?._id)[0];
    console.log('recipientId', recipientId, chat);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return;
            try {
                const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
                if (response.error) {
                    setError(response.message);
                } else {
                    setRecipientUser(response);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        getUser();
    }, [recipientId]);

    return { recipientUser, error };
};
