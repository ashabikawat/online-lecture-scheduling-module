import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, password, role, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, instructor: userExist });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

export { registerUser, loginUser };
