import mongoose from "mongoose";
import User from "./user.model.js";

const lectureSchema = mongoose.Schema({
  lectureName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    unique: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
