const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    newUser.save();
    res.send("User registration success.");
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email });
    console.log(user);
    if (user[0] && (await user[0].matchPassword(password))) {
      const userInfo = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(userInfo);
    } else {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Invalid email or password",
    });
  }
};

module.exports = { registerUser, loginUser };
