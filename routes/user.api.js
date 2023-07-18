const express = require("express");
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const router = express.Router();
const validator = require("../middlewares/validator");
const authentication = require("../middlewares/authentication");
/**
 * @route POST/users
 * @description register new user
 * @body {name, email,password}
 * @access Public
 */
router.post(
  "/",
  validator.validate([
    body("name", "Invalid Name").exists().notEmpty(),
    body("email", "Invalid Email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid PassWord").exists().notEmpty(),
  ]),
  userController.register
);

/**
 * @route GET/users/me
 * @description get current user info
 * @access login required
 */
router.get("/me", authentication.loginRequired, userController.getCurrentUser);
/**
 * @route PUT/users/:id
 * @description Update user Profile
 * @body {sex, brithday, phoneNumber, facebookLink }
 * @access Login required.
 */
router.put("/:id", authentication.loginRequired, userController.updateProfile);
module.exports = router;
