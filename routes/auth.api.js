const express = require("express")
const authController = require("../controllers/auth.controller")
const router = express.Router()
/**
 * @route POST/auth/sendcode
 * @description send code verify to user email(user email want to register)
 * @body {email}
 * @access Public
 */
router.post("/sendcode",authController.sendCode)

/**
 * @route POST/auth/Login
 * @description login with email and password
 * @body {email,password}
 * @access Public
 */

router.post("/login",authController.loginWithEmail)

module.exports = router