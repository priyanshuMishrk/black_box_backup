const Comment = new (require("../services/comment.service"))();

class Comment_ctrl {
  creatreComment = async (req, res) => {
    try {
      const commentBody = req.body;
      const result = await Comment.pushComments(commentBody);
      return res.status(200).json({ status: result });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  getComments = async (req, res) => {
    try{
        const result = await Comment.getComments(req.body)
        return res.status(200).json({status: result})
    }catch(err){
        res.status(400).json(err.message)
    }
  }

  editComments = async (req, res) => {
    try{
        const result = await Comment.editComments(req.body)
        return res.status(200).json({status: result})
    }catch(err){
        res.status(400).json(err.message)
    }
  }

  createCommentReply = async (req, res) => {
    try {
      const result = await Comment.replyComment(req.body)
      return res.status(200).json({status:result})
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  likeDislike = async (req, res) => {
    try {
      const result = await Comment.likeDislikeComment(req.body)
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  deleteComment = async (req, res) => {
    try {
      const result = await Comment.deleteComment(req.body)
      return res.status(201).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  likedUsers = async (req,res) => {
    try {
      const result = await Comment.getUsersWhoLikedComment(req.body)
      return res.status(200).json(result);
    }catch (err) {
      res.status(400).json(err.message);
    }
  }
}

module.exports = Comment_ctrl;
