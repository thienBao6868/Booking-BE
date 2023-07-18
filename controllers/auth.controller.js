const { catchAsync, sendResponse } = require("../helpers/utils");
const bcrypt = require("bcryptjs")

const mailgunLoader = require("mailgun-js");
const User = require("../models/User");

const mailgun = mailgunLoader({
  apiKey: "e2556aa9528af59079c1697da5ab675a-262b213e-c075822b",
  domain: "sandbox51414d1d950744bfbda40fb73b72215f.mailgun.org",
});

const sendEmail = (to, from, subject, content) => {
  let data = {
    to,
    from,
    subject,
    text: content,
  };
  return mailgun.messages().send(data);
};

const authController = {};
authController.sendCode = async (req, res, next) => {
  const email = req.body.email;
  try {
    await sendEmail(
      email,
      "bookingApp@mailgun.org",
      "Code verify create User",
      "123456"
    );
    sendResponse(res, 200, true, null, null, "Send code successfull");
  } catch (error) {
    next(error);
  }
};
authController.loginWithEmail = catchAsync(async (req, res, next) => {
   // get data from request
   const { email, password } = req.body;
   // business logic validation
   const user = await User.findOne({ email }, "+password");
   if (!user) throw new AppError(400, "invalid credentials", "Login Error");
 
   // Process
   const isMatch = bcrypt.compareSync(password, user.password);
   if (!isMatch) throw new AppError(400, "Wrong Password", "Login Error");
   const accessToken = await user.generateToken();
 
   //Response
   sendResponse(
     res,
     200,
     true,
     { user, accessToken },
     null,
     "Login with Email successful"
   );
});
module.exports = authController;
