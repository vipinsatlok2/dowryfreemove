const {
  login,
  home,
  post,
  updatePost,
  addPost,
  profile,
  pendingPost,
  users,
} = require("../controllers/render");
const { getUserName, isAuth, isAuthRole } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", getUserName, home);
router.get("/pending", getUserName, isAuth, isAuthRole, pendingPost);
router.get("/user/:id", getUserName, profile);
router.get("/post/:id", getUserName, post);
router.get("/update/:id", getUserName, isAuth, updatePost);
router.get("/add", getUserName, isAuth, addPost);
router.get("/login", getUserName, login);
router.get("/users", getUserName, isAuth, isAuthRole, users);

module.exports = router;
