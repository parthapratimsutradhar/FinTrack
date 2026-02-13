import AuthService from "../services/auth.service.js";
import { successResponse } from "../utils/responseHandler.js";

export const register = async (req, res) => {
  const user = await AuthService.register(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });
};

export const login = async (req, res) => {
  const result = await AuthService.login(req.body);

  return successResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
};

export const logout = async (req, res) => {
  await AuthService.logout(req.user);

  return successResponse(res, {
    statusCode: 200,
    message: "Logout successful",
  });
};

export const getProfile = async (req, res) => {
  return successResponse(res, {
    statusCode: 200,
    data: req.user,
  });
};

export const updateProfileController = async (req, res) => {
  const updatedUser = await AuthService.updateProfile({
    userId: req.user._id.toString(),        // currently logged-in user
    targetUserId: req.params.id,            // user ID in route params
    data: req.body,                         // validated fields from Zod
  });

  return successResponse(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    data: updatedUser,
  });
};

export const uploadProfilepic = async (req, res) => {
  if (!req.file) {
    const error = new Error("No file uploaded");
    error.statusCode = 400;
    throw error;
  }

  // Cloudinary stores the secure URL in req.file.path
  const fileUrl = req.file.path; // this is the actual Cloudinary URL

  const user = await AuthService.uploadProfilePic({
    userId: req.user._id.toString(),
    targetUserId: req.params.id,
    filePath: fileUrl, // pass Cloudinary URL
  });

  return successResponse(res, {
    statusCode: 200,
    message: "Profile picture updated",
    data: user,
  });
};

