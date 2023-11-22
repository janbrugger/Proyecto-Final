const autosModel = require("../models/autosModel");

const getUsers = (req, res) => {
  res.json(autosModel.getUsers());
};

const getUserById = (req, res) => {
  const user = autosModel.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const createUser = (req, res) => {
  const createdUser = autosModel.createUser(req.body);
  if (createdUser) {
    res.status(200).json(createdUser);
  } else {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
};

const updateUser = (req, res) => {
  const updatedUser = autosModel.updateUser(req.params.id, req.body);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const deleteUser = (req, res) => {
  const deletedUser = autosModel.deleteUser(req.params.id);
  if (deletedUser) {
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};
