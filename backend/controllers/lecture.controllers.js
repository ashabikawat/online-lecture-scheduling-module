import mongoose from "mongoose";
import Lecture from "../models/lecture.model.js";

const getLectures = async (_, res) => {
  try {
    const lecture = await Lecture.find();
    res.status(200).json(lecture);
  } catch (error) {
    throw new Error(error);
  }
};

const getLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById(id);
    res.status(200).json(lecture);
  } catch (error) {
    throw new Error(error);
  }
};

const getLecturesOfInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const objectId = mongoose.Types.ObjectId.createFromHexString(instructorId);
    const lectures = await Lecture.find({ instructorId: objectId });
    res.status(200).json(lectures);
  } catch (error) {
    throw new Error(error);
  }
};

const createLecture = async (req, res) => {
  try {
    const { body } = req;
    const lecture = await Lecture.create(body);
    res
      .status(200)
      .json({ message: "Lecture added successfully", lecture: lecture });
  } catch (error) {
    throw new Error(error);
  }
};

const updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Lecture updated successfully", lecture: lecture });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    await Lecture.findByIdAndDelete(id);
    res.status(200).json({ message: "Lecture deleted succesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getLectures,
  createLecture,
  getLecture,
  updateLecture,
  deleteLecture,
  getLecturesOfInstructor,
};
