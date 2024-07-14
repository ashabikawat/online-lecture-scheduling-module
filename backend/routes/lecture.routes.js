import express from "express";
import {
  createLecture,
  deleteLecture,
  getLecture,
  getLectures,
  updateLecture,
  getLecturesOfInstructor,
} from "../controllers/lecture.controllers.js";
import authorize from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getLectures);
router.get("/:id", getLecture);
router.get("/instructor/:instructorId", getLecturesOfInstructor);

router.post("/", authorize(["admin"]), createLecture);
router.put("/:id", authorize(["admin"]), updateLecture);
router.delete("/:id", authorize(["admin"]), deleteLecture);

export default router;
