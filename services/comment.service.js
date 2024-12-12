const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Comment {
  async pushComments(body) {
    try {
      const user_id = req.user_id
      const { post_id, comment_body } = body;
  
      // Check if any required field is missing
      if (!post_id || !user_id || !comment_body) {
        // If any required field is missing, return a 400 status code
        return { statusCode: 400, message: "Missing required fields" };
      }
  
      // All required fields are present, proceed with creating the comment
      const result = await prisma.comments.create({ data: body });
      
      return result;
    } catch (err) {
      return err.message;
    }
  }
    
      async getComments(body) {
        try {
          const result = await prisma.comments.findMany({ where: { post_id: body.id } });
          if (result) return result;
          return false;
        } catch (err) {
          return err.message;
        }
      }

    async editComments(body) {
      try {
        const { commentId, editedBody } = body;
        const result = await prisma.comments.update({
          where: { id: commentId },
          data: { comment_body: editedBody, edited: true },
        });
        if (result) return result;
        return false;
      } catch (err) {
        return err.message;
      }
    }

    async replyComment(body){
      try{
        const commentId = body.comment_id
        const data = {
          post_id : body.id ,
	        comment_body : body.comment,
	        like_count : 0,
          user_id : req.user_id,
          reply : false,
          reply_to : commentId
        }
        const result = await prisma.comments.create({data})
        if (result){
          const reply = result.id
          const originalCOmment = await prisma.comments.findMany({where : {id : commentId}
          },)
          if (!originalCOmment[0].reply){
            const finalResult = await prisma.comments.update({where: { id : commentId }, data : {reply :  true } })
            if (finalResult) return true
            else return false
          }else return true
        }
        else return false
      }catch (err){
        return err.message;
      }
    }

    async likeDislikeComment(body) {
      try {
        const { commentId } = body;
        const userId = req.user_id
        
        // Check if there is an existing reaction for the user and comment
        const existingReaction = await prisma.commentReaction.findUnique({
          where: { user_id: userId,
            react_to: commentId, },
        });
    
        if (existingReaction) {
          // Delete the existing reaction if it exists
          await prisma.commentReaction.delete({
            where: { id: existingReaction.id },
          });
        } else {
          // Create a new reaction
          await prisma.commentReaction.create({
            data: {
              user_id: userId,
              react_to: commentId,
            },
          });
        }
    
        return true;
      } catch (err) {
        return err.message;
      }
    }

    async deleteComment(body) {
      try {
        const { id } = body;
    
        // Delete the replies associated with the comment
        await prisma.comments.deleteMany({
          where: { reply_to: id },
        });
    
        // Delete the reactions associated with the comment
        await prisma.commentReaction.deleteMany({
          where: { react_to: id },
        });
    
        // Delete the comment itself
        await prisma.comments.delete({
          where: { id: id },
        });
    
        return true;
      } catch (err) {
        return err.message;
      }
    }

    async getUsersWhoLikedComment(commentId) {
      try {
        const likes = await prisma.commentReaction.findMany({
          where: { react_to: commentId },
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
                img_thumbnail: true,
              },
            },
          },
        });
    
        const usersWhoLiked = likes.map((like) => {
          return {
            first_name: like.user.first_name,
            last_name: like.user.last_name,
            img_thumbnail: like.user.img_thumbnail,
          };
        });
    
        return usersWhoLiked;
      } catch (err) {
        return err.message;
      }
    }

}

module.exports = Comment;