const bcrypt = require("bcrypt");
const UserModel = require("../Models/user");
const jwt = require('jsonwebtoken');

// user signup logic
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({
          message: "user is already exist, please try to login!",
          success: false,
        });
    }
    const userModel = new UserModel({ name, email, password });
    // encrypting password for security
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(401).json({
      message: "signup successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

// user login logic
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errMsg = "auth failed, incorrect email or password";
      if (!user) {
        return res
          .status(403)
          .json({
            message: errMsg,
            success: false,
        });
    }
      // dcrypt password and comparing from real password for user login
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(403)
          .json({
            message: errMsg,
            success: false,
        });
    }
    // using jwt for encryption and dcryption
      const token = jwt.sign(
        {email: user.email, _id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
      )
      res.status(200).json({
        message: "login successfully",
        success: true,
        token,
        email,
        name: user.name
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
        success: false,
      });
    }
};

module.exports = {
  signup,
  login
};
