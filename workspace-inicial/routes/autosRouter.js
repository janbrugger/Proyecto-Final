/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const autosRouter = express.Router();

const autosController = require("../controllers/autosController");

autosRouter.get("/", autosController.getUsers);

autosRouter.get("/:id", autosController.getUserById);

autosRouter.post("/", autosController.createUser);

autosRouter.put("/:id", autosController.updateUser);

autosRouter.delete("/:id", autosController.deleteUser);

module.exports = autosRouter;
