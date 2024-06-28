const {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  deleteUser,
  forgotPassword,
  verifyOTP,
  changepassword,
} = require("../controller/authController");
const { isAuthenticated } = require("../middleware/middleware");
const catchError = require("../services/catchError");

const router = require("express").Router();

router.route("/api/auth/signup/").post(catchError(registerUser));
router.route("/api/auth/login").post(catchError(loginUser));
router
  .route("/api/auth/profile")
  .get(isAuthenticated, catchError(getProfile))
  .patch(isAuthenticated, catchError(updateUser));
router
  .route("/api/auth/profile/:id")
  .patch(isAuthenticated, catchError(updateUser))
  .delete(isAuthenticated, catchError(deleteUser));
router.route("/auth/forgotpassword").post(catchError(forgotPassword));
router.route("/auth/verifyotp/:id").post(catchError(verifyOTP));
router.route("/auth/changepassword/:id").post(catchError(changepassword));

module.exports = router;
