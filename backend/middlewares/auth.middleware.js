// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authorize = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        throw new Error("User not found");
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  };
};

export default authorize;
