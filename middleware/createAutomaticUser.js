const User = require("../models/user");

// Function to create a user immediately after authentication
const createAutomaticUser = async (req, res, next) => {
  try {
    const { sub, email } = req.oidc.user;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next();
    }

    // Create a new user
    const newUser = new User({
      username: sub,
      email,
    });

    await newUser.save();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { createAutomaticUser };
