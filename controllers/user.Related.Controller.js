import UserModel from "../models/user.Model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const accountAuthHandler = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Please login or create account." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in accountAuthHandler:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const newAccountHandler = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const alreadyCreated = await UserModel.findOne({ email });
    if (alreadyCreated) {
      return res.status(400).json({
        message: "Email already registered. Please login or use another email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await UserModel.create({ username, email, password: hashedPassword });

    // create token
    const token = jwt.sign({ userId: createdUser._id }, JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "Lax",
      secure: false, // set to true in production with HTTPS
    });

    return res.status(201).json({ message: "Account created successfully!", userInfo: createdUser });
  } catch (error) {
    console.log("Error in newAccountHandler:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const loginAccountHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    const userAuth = await bcrypt.compare(password, findUser.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid password. Try again." });
    }

    const token = jwt.sign({ userId: findUser._id }, JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({ message: "Login successful!", userInfo: findUser });
  } catch (error) {
    console.log("Error in loginAccountHandler:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

