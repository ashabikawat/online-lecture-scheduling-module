import User from "../models/user.model.js";

const getUsers = async (_, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

export { getUser, getUsers, updateUser, deleteUser };
