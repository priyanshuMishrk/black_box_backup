const router = require("express").Router();
const Comment_inf = new (require("../controllers/comment.ctrller"))();
const { authorizationToken } = require("../auth/user.auth");

router.post("/comments", Comment_inf.creatreComment);
router.get("/comments", Comment_inf.getComments);
router.put("/comments", Comment_inf.editComments);
router.delete("/comments", Comment_inf.deleteComment)
router.post("./commentLikes", Comment_inf.likeDislike)
router.post("./commentReply", Comment_inf.createCommentReply)
router.get("./commentLikes", Comment_inf.likedUsers)



module.exports = router