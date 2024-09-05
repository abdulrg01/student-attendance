const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJwt");
const users = require("../controllers/user");

router.route("/login").post(loginLimiter, users.login);

router.route("/refresh").get(users.refresh);

router.route("/logout").post(verifyJWT, users.logout);

router
  .route("/")
  .get(verifyJWT, users.getAllUsers)
  .post(users.createNewUser)
  .delete(verifyJWT, users.deleteUser);

router.route("/auth/:id").get(users.getUserInfo);

router.route("/updateUser").patch(verifyJWT, users.updateUserinfo);

router.route("/auth/update/profile").put(verifyJWT, users.updateUserPic);

router.route("/social-auth").post(loginLimiter, verifyJWT, users.socialAuth);

module.exports = router;
