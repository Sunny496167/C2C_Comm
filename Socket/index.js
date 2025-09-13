const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:5173",
    },
});

let users = new Map();  // Use Map for fast lookups

// Add user function with error handling
const addUser = (userId, socketId) => {
    try {
        if (!users.has(userId)) {
            users.set(userId, { userId, socketId });
            console.log(`User ${userId} added with socketId ${socketId}`);
        }
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

// Remove user function with error handling
const removeUser = (socketId) => {
    try {
        for (let [userId, user] of users) {
            if (user.socketId === socketId) {
                users.delete(userId);
                console.log(`User ${userId} removed on disconnect`);
                break;
            }
        }
    } catch (error) {
        console.error("Error removing user:", error);
    }
}

// Get user function with error handling
const getUser = (userId) => {
    try {
        return users.get(userId);
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

io.on("connection", (socket) => {
    console.log("A user connected");

    // Add user
    socket.on("addUser", (userId) => {
        try {
            addUser(userId, socket.id);
            io.emit("getUsers", Array.from(users.values()));  // Emit the user list as an array
        } catch (error) {
            console.error("Error adding user on connection:", error);
        }
    });

    // Send or receive a message
    socket.on("sendMessage", ({ senderId, recieverIds, text, conversationId }) => {
        try {
            recieverIds.forEach((recieverId) => {
                const user = getUser(recieverId);
                if (user) {
                    io.to(user.socketId).emit("getMessage", {
                        senderId,
                        text,
                        conversationId,
                        createdAt: new Date(),
                    });
                } else {
                    console.error(`User ${recieverId} not found for message delivery.`);
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    // Disconnect user
    socket.on("disconnect", () => {
        try {
            console.log("A user disconnected.");
            removeUser(socket.id);
            io.emit("getUsers", Array.from(users.values()));  // Emit updated user list
        } catch (error) {
            console.error("Error during disconnect:", error);
        }
    });

    // Handle error in socket connection
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});
