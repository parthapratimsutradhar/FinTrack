import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.model.js";
import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

class AuthService {
  // Register a new user
  static async register(data) {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists"); // Conflict
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  // Login user
  static async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password"); // Unauthorized
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password"); // Unauthorized
    }

    const token = generateToken(
      { id: user._id },
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  // Logout (dummy for JWT)
  static async logout() {
    return true;
  }

  // Update user profile
  static async updateProfile({ userId, targetUserId, data }) {
    if (userId !== targetUserId) {
      throw new ApiError(403, "Unauthorized"); // Forbidden
    }

    const user = await User.findById(targetUserId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Update only the provided fields
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    await user.save();

    const { password, ...userData } = user.toObject();
    return userData;
  }

  // Upload / update profile picture
  static async uploadProfilePic({ userId, targetUserId, filePath }) {
    if (userId !== targetUserId) {
      throw new ApiError(403, "Unauthorized"); // Forbidden
    }

    // Fetch the user
    const user = await User.findById(targetUserId);
    if (!user) {
      throw new ApiError(404, "User not found"); // Not Found
    }

    // Delete old Cloudinary image if it exists and is not default
    if (user.profilePic && !user.profilePic.includes("ui-avatars.com")) {
      try {
        const parts = user.profilePic.split("/");
        const fileNameWithExt = parts[parts.length - 1]; // e.g., "abc123.jpg"
        const publicId = `fintrack/profile/${fileNameWithExt.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete old Cloudinary image:", err.message);
      }
    }

    // Update user with new profile picture
    user.profilePic = filePath; // Cloudinary URL
    await user.save();

    // Return updated user without password
    const { password, ...userData } = user.toObject();
    return userData;
  }
}

export default AuthService;
