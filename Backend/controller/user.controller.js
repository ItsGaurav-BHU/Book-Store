import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { AppError } from "../middleware/errorHandler.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { fullname, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new AppError("User already exists with this email", 400);
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const createdUser = new User({
    fullname,
    email,
    password: hashPassword,
  });
  
  await createdUser.save();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
      _id: createdUser._id,
      fullname: createdUser.fullname,
      email: createdUser.email,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 400);
  }

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
});
