const { catchAsync, AppError, sendResponse } = require("../helpers/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};
userController.register = catchAsync(async (req, res, next) => {
  // get data from request
  let { name, email, password } = req.body;
  // business logic validation
  let user = await User.findOne({ email });
  if (user)
    throw new AppError("400", "User already exists", " Registration Error");

  // Process
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  user = await User.create({ name, email, password });

  const accessToken = await user.generateToken();

  //Response
  sendResponse(res, 200, true, { user }, null, "Create user successful");
});

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  // get data from request
  const currentUserId = req.userId;
  // business logic validation
  const user = await User.findById(currentUserId);
  if (!user)
    throw new AppError("400", "User not found", " Get current User Error");
  // Process
  //Response
  sendResponse(res, 200, true, user, null, "Get current User Successful");
});

userController.updateProfile = catchAsync(async (req, res, next) => {
  // get data from request
  const currentUserId = req.userId;
  const userId = req.params.id;
  // business logic validation
  if (currentUserId !== userId)
    throw new AppError(400, "Permission required", "Update Error");
  let user = await User.findById(userId);
  if (!user) throw new AppError("400", "User not found", " Update User Error");
  // Process
  const allows = ["name", "sex", "city", "phoneNumber", "facebookLink"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  await user.save();

  //Response
  sendResponse(res, 200, true, user, null, "update User User Successful");
});

module.exports = userController;
