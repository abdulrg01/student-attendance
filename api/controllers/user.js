const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

// @desc Get user info
// @route GET /users/auth
// @access Private
const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").exec();

  if (!user) return res.status(400).json({ message: "No User found" });

  res.json(user);
};

const updateUserinfo = async (req, res) => {
  const { name } = req.body;

  const userId = req.user;

  const user = await User.findById(userId).exec();

  if (!name || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== userId) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.name = name;

  const updatedUser = await user.save();

  res.status(200).json({ updatedUser, message: `${updatedUser.name} updated` });
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
  const { email, name, password } = req.body;

  // Confirm data
  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate name
  const duplicate = await User.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate name" });
  }

  const userObject = { email, name, password };

  // Create and store new user
  const user = await User.create(userObject);

  const token = jwt.sign(
    {
      UserInfo: {
        name: user.name,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { name: user.name, id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send token and user containing user info
  res.json({ token, user });
};

// @desc UpdateUserPic a user
// @route PATCH /users/auth
// @access Private
const updateUserPic = async (req, res) => {
  const id = req.user

  const { avatar } = req.body;

  const user = await User.findById(id).exec();

  if (!user)
    return res
      .status(400)
      .json({ message: "Invalid User" });

  const cloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "schoolcn",
    width: 150,
  });

  user.avatar = {
    publicId: cloud.public_id,
    url: cloud.secure_url,
  };

  await user.save();

  res.status(200).json({ success: true, user });
};

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const matchPwd = await foundUser.matchPassword(password);

  if (!matchPwd)
    return res.status(401).json({ message: "enter correct password" });

  const token = jwt.sign(
    {
      UserInfo: {
        name: foundUser.name,
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { name: foundUser.name, id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send token and user containing user info
  res.json({ token, user: foundUser });
};

// @desc socialLogin with Goggle, Facebook
// @route POST /users/auth/refresh
// @access Public
const socialAuth = async (req, res) => {
  const { name, email, avatar } = req.body;

  const user = await User.findOne({ email }).exec();

  if (!user) {
    const user = await User.create({ email, name, avatar });

    const token = jwt.sign(
      {
        UserInfo: {
          name: user.name,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { name: user.name, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send token and user containing user info
    res.json({ token, user });
  } else {
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(401).json({ message: "No user found" });

    const token = jwt.sign(
      {
        UserInfo: {
          name: user.name,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { name: user.name, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    // Send token and user containing user info
    res.json({ token, user });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const token = jwt.sign(
        {
          UserInfo: {
            name: foundUser.name,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ token, user: foundUser });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  getUserInfo,
  updateUserPic,
  updateUserinfo,
  login,
  socialAuth,
  refresh,
  logout,
};
