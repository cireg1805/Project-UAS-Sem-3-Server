const express = require("express");
const routes = express.Router();
const userControllers = require("../controllers/user.controllers");
const verifyToken = require("../function/verifyToken"); // Untuk otentikasi


routes.post("/login", userControllers.login);
routes.post("/user/", userControllers.createUser);
routes.use(verifyToken);
routes.get("/user/", userControllers.readUsers);
routes.get("/user/:id", userControllers.readUser);
routes.patch("/user/:id", userControllers.updateUser);
routes.delete("/user/:id", userControllers.deleteUser);
module.exports = routes;

