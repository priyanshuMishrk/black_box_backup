//Remeber the errors can be from here also, when without .evn...
//did not occured the changes let me try again...
require("dotenv").config();
//////-----> rember this part...
require("./auth/google.auth");
require("./auth/facebook.auth");
//Modules : ) ...
const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
const http = require("http");
//  -----> rember this part...
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Helping to understand APIs...
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");
// const swaggerDocs = swaggerJSDoc(require("./swagger.json"));

//The status to the console, when triggered an API...
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://blackboxnow.com","https://blackboxnow.com", "http://13.232.61.215"], // Add all client origins
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//Middlewares Section...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static('public'));


/////Related to social auth....
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY_TOKEN,
    resave: true,
    saveUninitialized: true,
  }),
);
// -----> rember this part..
app.use(passport.initialize());
app.use(passport.session());

//Home page///
///////Remeber for heroku APP....
// -----> rember this part..
// if (process.env.NODE_ENV == "production") {
// app.use(express.static("client/build"));  
//   // app.get("/*", (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
//   // });
// }
// app.get("/", async (req, res, next) => {
//   res.send({
//     message:
//       "You are successfully standing on to the root page, please go to /api/users || /api/course page to view details.",
//   });
// res.send(
//   '<a href="http://localhost:3001/api/signup/google">Authenticate with Google</a>'
// );
// });

//The APIs sections...
app.use("/api", require("./routes/users.routes"));
app.use("/api", require("./routes/courses.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api", require("./routes/classroom.routes"));
app.use("/api",require("./routes/comments.routes"))
app.use("/api",require("./routes/V2/usersV2.routes"))
app.use("/api",require("./routes/V2/classroomV2.routes"))
app.use("/api",require('./routes/V2/chatV2.routes'))

const sendNotification = async (userId, message) => {
  try {
    // Create a new notification in the database
    await prisma.notification.create({
      data: {
        userId, // Target user ID
        message, // Notification message
      },
    });

    // Send notification via Socket.IO
    io.to(`user_${userId}`).emit("notification", { message });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};


const enrichChatRooms = async (chatRooms, user) => {
  const enrichedRooms = [];

  for (const room of chatRooms) {
    // Find the first other participant excluding the current user
    const otherParticipantId = room.participants.find((participantId) => participantId !== user);

    let profileUser = null;

    if (otherParticipantId) {
      // Query user details for the other participant
      profileUser = await prisma.users.findUnique({
        where: { id: otherParticipantId }
      });
    }

    // Add the `profileUser` key to the chat room
    enrichedRooms.push({
      ...room,
      profileUser, // Add the single matched profile
    });
  }

  return enrichedRooms;
};


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);


  socket.on("userSearch" , async (data) => {

    const users = await prisma.users.findMany({
      where: {
        OR: [
          { first_name: { contains: data, mode: 'insensitive' } },
          { last_name: { contains: data, mode: 'insensitive' } },
          { email: { contains: data, mode: 'insensitive' } }
        ]
      }
    });


    // console.log("data:", data);
    socket.emit("userResult", users);
  });

  socket.on("useAlive", async (userId) => {
    userId = parseInt(userId)
    try {
      const lastUpdate = await prisma.keepAlive.findUnique({
        where: { userId },
        select: { updatedAt: true },
      });
      console.log('keepingUserASl')
  
      const now = new Date();
      
      if (!lastUpdate || now - new Date(lastUpdate.updatedAt) > 20000) { // 20 seconds
        await prisma.keepAlive.upsert({
          where: { userId },
          update: { isAlive: true, updatedAt: now },
          create: { userId, isAlive: true },
        });
      }
    } catch (error) {
      console.error("Error updating keepAlive status:", error);
    }
  });

  socket.on("sendNotification", async (data) => {
        try {
            const { userId, title, description, img } = data;

            // Check if user is alive
            const isAlive = await prisma.keepAlive.findUnique({
                where: { userId },
                select: { alive: true }
            });

            if (!isAlive || !isAlive.alive) {
                console.log(`User ${userId} is not online. Notification not sent.`);
                return;
            }

            // Create the notification in the database
            const notification = await prisma.notification.create({
                data: {
                    userId,
                    title,
                    description,
                    img,
                    status: "WAITING", // Initially in waiting state
                }
            });

            // Emit notification to all rooms the user is part of
            io.emit(`notification:${userId}`, {
                id: notification.id,
                title,
                description,
                img,
                sentAt: new Date(),
            });

            // Update the notification status to SENT
            await prisma.notification.update({
                where: { id: notification.id },
                data: {
                    status: "SENT",
                    sentAt: new Date(),
                }
            });

            console.log(`Notification sent to user ${userId}`);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    });
  

  socket.on("userEnterChat" , async (data) => {
    const user = parseInt(data.seq)
    const chatRooms = await prisma.chat_rooms.findMany({
      where: {
        participants: {
          has: user // Check if the `user` exists in the `participants` array
        }
      }
    })
    if (chatRooms.length > 0) {

      const enrichedRooms = await enrichChatRooms(chatRooms, user);

      socket.emit("chatRooms", enrichedRooms);
    } else {
      socket.emit("chatRooms", []);
    }
  });

  
  socket.on("newContact" , async (data) => {
    console.log("data:", data);
    socket.emit("newContact", data);
  });

  socket.on("joinChat", async (chatRoomId) => {
    socket.join(chatRoomId);
    // console.log(`User ${socket.id} joined chat room ${chatRoomId}`);

    // Fetch existing messages for the chat room
    const messages = await prisma.message.findMany({
      where: { chatRoomId : chatRoomId.chatRoomId },
      orderBy: { timestamp: "asc" }, // Sort by timestamp
    });

    // Send existing messages to the user
    socket.emit("chatHistory", messages);
  });

  // Handle sending a new message
  socket.on("sendMessage", async (data) => {
    const { chatRoomId, senderId, content } = data;

    // Save the message to the database
    const newMessage = await prisma.message.create({
      data: {
        chatRoomId,
        senderId,
        content,
        timestamp: new Date(),
      },
    });
    console.log(data)

    // Update the last message in the chat room
    await prisma.chat_rooms.update({
      where: { id: chatRoomId },
      data: {
        last_message: content,
        last_message_time: new Date(),
      },
    });

    // Fetch the updated message list for the chat room
    const updatedMessages = await prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { timestamp: "asc" },
    });

    // Emit the updated message list to all participants in the room
    io.to(chatRoomId).emit("receiveMessages", updatedMessages);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  socket.on("error", (err) => {
    console.error("Socket.IO error:", err);
  });
});


// Inside the "connection" event handler
// app.use("/meeting", require("./server"));
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Error Handlings...
app.use((req, res, next) => {
  //////For the heroku appp -----> rember this part..
  // res.redirect("http://localhost:3001");
  // res.redirect("https://creative-black-box.herokuapp.com/");
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  console.log(err.status, "comming from herr...");
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
});

//The listner...
debugger;
try {
  const PORT = process.env.PORT || 3002;
  // server.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  server.listen(PORT, '0.0.0.0', () => console.log(`🚀 @ http://localhost:${PORT}`));
} catch (err) {
  console.log(err.message);
}
