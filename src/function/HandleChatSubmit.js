import socket from "../services/socket"

export const handleChatSubmit = (userId, content, eventId, groupId) => {
    const message = {
        user_id: userId,
        content: content,
        event_id: eventId,
        group_id: groupId
    }
    socket.emit("send-message", message)
}