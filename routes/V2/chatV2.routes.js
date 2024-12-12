const express = require("express");
const chatRoute = express.Router();
const { authorizationToken } = require("../../auth/user.auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { notify } = require('./notifyVerification')
const sendMessage = require('./msgVerification')
const axios = require('axios');
const verifyUPI = require('validate-upi-id')
const bcrypt = require("bcrypt");
const { authenticationToken } = require("../../auth/user.auth");

// chatRoute.post("/getChat", authorizationToken, async (req, res) => {
//   const id = req.user_id
//   try {
//     const result = await prisma.chat.findMany({
//       where: {
//         user_id: id
//       },
//       include: {
//         user: true,
//       },
//     });
//     return res.send(result)
//   } catch (er) {
//     return res.send(er)
//   }
// });


chatRoute.post("/message-request", authorizationToken, async (req, res) => {
    const senderId = req.user_id; // Extracting the sender ID from the token (assumed to be available)
    const receiverId = parseInt(req.query.receiverId); // The receiver's user ID from the query
    const message = req.body.message; // The message content sent with the request
  
    try {
      // Check if the sender and receiver are the same (cannot send a message to yourself)
      if (senderId === receiverId) {
        return res.status(400).send({ message: "You cannot send a message to yourself." });
      }
  
      // Check if there's already an existing message request between sender and receiver
      const existingRequest = await prisma.messageRequest.findUnique({
        where: {
          senderId_receiverId: {
            senderId,
            receiverId,
          },
        },
      });
  
      if (existingRequest) {
        return res.status(400).send({ message: "Message request already exists." });
      }
  
      // Create a new message request
      const newMessageRequest = await prisma.messageRequest.create({
        data: {
          senderId, // The sender of the message
          receiverId, // The receiver of the message
          message, // The message content
          status: 'PENDING', // The status of the request (default is pending)
        },
      });
  
      return res.status(201).send(newMessageRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "An error occurred while creating the message request." });
    }
  });

chatRoute.get("/sent-requests", authorizationToken, async (req, res) => {
    const senderId = req.user_id; // Extracting the sender ID from the token (assumed to be available)
  
    try {
      // Fetch all message requests where the sender is the logged-in user
      const sentRequests = await prisma.messageRequest.findMany({
        where: {
          senderId: senderId,
        },
      });
  
      // For each request, fetch the receiver's details from the User model
      const requestsWithReceiverDetails = await Promise.all(
        sentRequests.map(async (request) => {
          const receiver = await prisma.user.findUnique({
            where: {
              id: request.receiverId,
            },
            select: {
              id: true,
              name: true, // Example: Receiver's name
              email: true, // Example: Receiver's email
            },
          });
  
          return {
            ...request,
            receiver,
          };
        })
      );
  
      // Respond with the list of requests, including receiver details
      return res.status(200).send(requestsWithReceiverDetails);
      // console.log("the code is  working here")
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "An error occurred while fetching sent requests." });
    }
  });

  chatRoute.get("/message-requests", authorizationToken, async (req, res) => {
    const receiverId = req.user_id; // Extract the receiver's user ID from the token
  
    try {
      // Fetch all message requests where the logged-in user is the receiver
      const messageRequests = await prisma.messageRequest.findMany({
        where: {
          receiverId, // Match the receiver ID (the logged-in user)
          status: 'PENDING', // Optionally, you can filter by status if you only want "pending" requests
        },
      });
  
      // Now, for each message request, we query the User model to get sender details
      const messageRequestsWithSenderDetails = await Promise.all(
        messageRequests.map(async (request) => {
          const sender = await prisma.users.findUnique({  
            where: {
              id: request.senderId, // Use senderId from the message request
            },
            select: {
              img_thumbnail: true, // Include sender's image thumbnail
              first_name: true, // Include sender's first name
              last_name: true, // Include sender's last name
            },
          });
  
          return {
            ...request,
            sender, // Add sender details to the request
          };
        })
      );
  
      if (messageRequestsWithSenderDetails.length === 0) {
        return res.status(404).send({ message: "No message requests found." });
      }
  
      // Return the message requests with sender details
      return res.status(200).send(messageRequestsWithSenderDetails);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "An error occurred while fetching message requests." });
    }
  });

  chatRoute.post("/toggle-follow", authorizationToken, async (req, res) => {
    const userId = req.user_id; // Extract the ID of the user making the request (from token)
    const targetUserId = parseInt(req.query.targetUserId); // The ID of the user to follow/unfollow
  
    try {
      if (userId === targetUserId) {
        return res.status(400).send({ message: "You cannot follow yourself." });
      }
  
      // Check if the follow relationship already exists
      const existingFollow = await prisma.follower.findUnique({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId,
          },
        },
      });
  
      if (existingFollow) {
        // If already following, unfollow
        await prisma.follower.delete({
          where: {
            id: existingFollow.id,
          },
        });
        return res.status(200).send({ message: "Unfollowed successfully." });
      } else {
        // If not following, follow
        await prisma.follower.create({
          data: {
            followerId: userId,
            followingId: targetUserId,
          },
        });
        return res.status(201).send({ message: "Followed successfully." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "An error occurred while toggling follow status." });
    }
  });

  chatRoute.get("/followers", async (req, res) => {
    const targetUserId = parseInt(req.query.userId); // The ID of the user whose followers are to be retrieved
  
    try {
      if (!targetUserId) {
        return res.status(400).send({ message: "User ID is required." });
      }
  
      // Fetch all followers for the target user
      const followers = await prisma.follower.findMany({
        where: {
          followingId: targetUserId, // The user being followed
        }
      });
  
      // Format the result for easier consumption
      const formattedFollowers = followers.map((f) => f.follower);
  
      return res.status(200).send(formattedFollowers);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "An error occurred while retrieving followers." });
    }
  });

  chatRoute.get("/following", async (req, res) => {
    const userId = parseInt(req.query.userId); // The ID of the user whose following list is to be retrieved
  
    try {
      if (!userId) {
        return res.status(400).send({ message: "User ID is required." });
      }
  
      // Fetch all users the given user is following
      const following = await prisma.follower.findMany({
        where: {
          followerId: userId, // The user who is following others
        }
      });
  
      // Format the result for easier consumption
      const formattedFollowing = following.map((f) => f.following);
  
      return res.status(200).send(formattedFollowing);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "An error occurred while retrieving following list." });
    }
  });

  chatRoute.get("/notifications/history", authorizationToken, async (req, res) => {
    const userId = req.user_id;
  
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId: userId, // Fetch notifications for the logged-in user
        },
        orderBy: {
          createdAt: 'desc', // Sort notifications by the most recent first
        },
      });
  
      return res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications history', error);
      return res.status(500).send({ message: "An error occurred while fetching notifications." });
    }
  });

  chatRoute.post("/create-chatroom", async (req, res) => {
    const { messageRequestId } = req.body; // Get message request ID from the request body
  
    if (!messageRequestId) {
      return res.status(400).json({ error: "Message request ID is required." });
    }
  
    try {
      // Fetch message request details (Replace this with your actual database query)
      const messageRequest = await prisma.messageRequest.findUnique({
        where: { id: messageRequestId },
      });
  
      if (!messageRequest) {
        return res.status(404).json({ error: "Message request not found." });
      }
  
      // Check if a chat room already exists with these participants
      const existingChatRoom = await prisma.chat_rooms.findFirst({
        where: {
          type: "private",
          participants: {
            hasEvery: [messageRequest.senderId, messageRequest.receiverId],
          },
        },
      });
  
      let chatRoomId;
      if (existingChatRoom) {
        chatRoomId = existingChatRoom.id;
      } else {
        // Create a new chat room
        const newChatRoom = await prisma.chat_rooms.create({
          data: {
            type: "private",
            participants: [messageRequest.senderId, messageRequest.receiverId],
            last_message: messageRequest.message,
            last_message_time: messageRequest.timestamp,
          },
        });
  
        chatRoomId = newChatRoom.id;
      }
  
      // Save the initial message in the chat room
      await prisma.message.create({
        data: {
          senderId: messageRequest.senderId,
          chatRoomId,
          content: messageRequest.message,
          timestamp: messageRequest.timestamp,
        },
      });
  
      // Optionally delete the message request after it's been converted to a chat
      await prisma.messageRequest.delete({ where: { id: messageRequestId } });
  
      return res.status(201).json({
        message: "Chat room created successfully.",
        chatRoomId,
      });
    } catch (error) {
      console.error("Error creating chat room:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  });

  module.exports = chatRoute;